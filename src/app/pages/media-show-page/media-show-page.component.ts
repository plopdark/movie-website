import { Component, inject, OnInit } from '@angular/core';
import {
  CountryReleaseDates,
  CreditsResp,
  Media,
  MediaImage,
  ReleaseDatesResp,
  ReviewInfo,
  TvContentRating,
  TvContentRatingResp,
} from '../../utils/interfaces/movie.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Icons } from '../../utils/enums/icons.enum';
import { MediaType } from '../../utils/types/types';
import { RoutingEnum } from '../../utils/enums/routing.enum';
import { NgClass, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-media-show-page',
  standalone: true,
  imports: [HeaderComponent, NgClass, NgIf, NgForOf],
  templateUrl: './media-show-page.component.html',
  styleUrl: './media-show-page.component.scss',
})
export class MediaShowPageComponent implements OnInit {
  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private dataService = inject(DataService);

  private sanitizer = inject(DomSanitizer);

  public media!: any;

  public trailerUrl?: SafeResourceUrl;

  public cast?: CreditsResp;

  public contentRating?: string;

  public releaseDate?: string;

  public mediaLongevity?: string;

  public similarMedia?: Media[];

  public similarStarIcon: string = '';

  public rateText: string = 'Rate';

  public mediaImages: MediaImage[] = [];

  public isInWatchlistMain: boolean = false;

  public lightboxSrc: string | null = null;

  public mediaReviews: ReviewInfo[] = [];

  public watchlistMap = new Map<number, boolean>();

  private accountId: number = 21967768;

  public isRatingModalOpen: boolean = false;

  public selectedRating: number = 0;

  private session: string = localStorage.getItem('session_id')!;

  public get mediaType(): MediaType {
    return this.media.title ? 'movie' : 'tv';
  }

  public readonly emptyStarButton = Icons.EmptyStarIcon;

  public readonly filledStarButton = Icons.GoldStarIcon;

  public readonly notInWatchlistIcon = Icons.WatchlistMarkerPlus;

  public readonly inWatchListIcon = Icons.BookmarkYellow;

  public readonly listButtonRight = Icons.ListButtonRight;

  public readonly listButtonLeft = Icons.ListButtonLeft;

  public starButton = this.emptyStarButton;

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();

    if (nav?.extras.state?.['media']) {
      this.media = nav.extras.state['media'] as Media;
      return;
    }

    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const type = params.get('type') as MediaType | null;
          const id = Number(params.get('id'));

          if (!type || isNaN(id)) {
            this.router.navigate(['']);
            return of(null);
          }

          return this.dataService.getAllMediaDetails(type, id);
        }),
      )
      .subscribe((media) => {
        if (media) {
          this.media = media;
          this.initializeEverything();
        } else {
          this.router.navigate(['']);
        }
      });
  }

  public toggleWatchListForSimilar(similar: Media) {
    const id = similar.id;
    const currently = this.watchlistMap.get(id) || false;
    const next = !currently;

    this.dataService
      .toggleWatchlist(21967768, this.mediaType, id, next, this.session!)
      .subscribe((res) => {
        if (res.success) {
          this.watchlistMap.set(id, next);
        }
      });
  }

  public getBookmarkIcon(id: number): string {
    return this.watchlistMap.get(id)
      ? this.inWatchListIcon
      : this.notInWatchlistIcon;
  }

  public toggleWatchlistMain() {
    const next = !this.isInWatchlistMain;
    this.dataService
      .toggleWatchlist(
        this.accountId,
        this.mediaType,
        this.media.id,
        next,
        this.session,
      )
      .subscribe((res) => {
        if (res.success) {
          this.isInWatchlistMain = next;
        }
      });
  }

  public onSimilarMediaClick(item: Media): void {
    const type: MediaType = item.title ? 'movie' : 'tv';
    this.router.navigate([RoutingEnum.MediaShow, type, item.id], {
      state: { media: item },
    });
  }

  public openLightbox(src: string) {
    this.lightboxSrc = src;
  }

  public closeLightbox() {
    this.lightboxSrc = null;
  }

  public toggleRating(): void {
    this.isRatingModalOpen = true;
  }

  public closeRating(): void {
    this.isRatingModalOpen = false;
    this.selectedRating = 0;
  }

  public selectRating(value: number): void {
    this.selectedRating = value;
  }

  public submitRating(): void {
    if (this.selectedRating > 0) {
      this.dataService
        .postMediaRating(
          this.mediaType,
          this.media.id,
          this.session!,
          this.selectedRating,
        )
        .subscribe(() => this.closeRating());
      this.starButton = this.filledStarButton;
      this.rateText = this.selectedRating.toString();
    }
  }

  private initializeEverything(): void {
    this.loadTrailer();
    this.loadCast();
    this.loadRating();
    this.setReleaseDate();
    this.loadFullDetails();
    this.loadMediaLongevity();
    this.loadSimilar();
    this.checkMainWatchlistStatus();
    this.loadImages();
    this.loadReview();
    this.loadAccountState();
  }

  private checkMainWatchlistStatus() {
    this.dataService
      .getWatchList(this.accountId, this.session)
      .subscribe((listResp) => {
        this.isInWatchlistMain = listResp.results.some(
          (m) => m.id === this.media.id,
        );
      });
  }

  private loadAccountState() {
    this.dataService
      .getAccountStates(this.mediaType, this.media.id, this.session)
      .subscribe((state) => {
        if (state.rated && typeof state.rated.value === 'number') {
          this.selectedRating = state.rated.value;
          this.rateText = state.rated.value.toString();
          this.starButton = this.filledStarButton;
        }
      });
  }

  private loadTrailer() {
    this.dataService
      .getMediaVideos(this.mediaType, this.media.id)
      .subscribe((res) => {
        const trailer = res.results.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube',
        );

        if (trailer) {
          this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${trailer.key}`,
          );
        }
      });
  }

  private loadCast(): void {
    this.dataService
      .getMediaCredits(this.mediaType, this.media.id)
      .subscribe((res) => {
        this.cast = res;
      });
  }

  private loadRating(): void {
    const id = this.media.id;
    const isMovie = !!this.media.title;

    if (isMovie) {
      this.dataService.getMovieContentRatings(id).subscribe({
        next: (res: ReleaseDatesResp) => {
          const country: CountryReleaseDates | undefined =
            res.results.find((r) => r.iso_3166_1 === 'US') || res.results[0];

          this.contentRating =
            country?.release_dates[0]?.certification || 'N/A';
        },
        error: (err: any) => {
          console.error('Cannot load movie rating', err);
          this.contentRating = 'N/A';
        },
      });
    } else {
      this.dataService.getTvContentRatings(id).subscribe({
        next: (res: TvContentRatingResp) => {
          const country: TvContentRating | undefined =
            res.results.find((r) => r.iso_3166_1 === 'US') || res.results[0];

          this.contentRating = country?.rating || 'N/A';
        },
        error: () => {
          this.contentRating = 'N/A';
        },
      });
    }
  }

  private setReleaseDate(): void {
    if (this.media.release_date) {
      this.releaseDate = this.media.release_date.slice(0, 4);
    } else if (this.media.first_air_date) {
      this.releaseDate = this.media.first_air_date.slice(0, 4);
    }
  }

  private loadFullDetails(): void {
    this.dataService
      .getAllMediaDetails(this.mediaType, this.media.id)
      .subscribe((res) => {
        this.media = res;
        this.loadMediaLongevity();
      });
  }

  private formatRuntime(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  private loadMediaLongevity(): void {
    if (this.media.runtime) {
      this.mediaLongevity = this.formatRuntime(this.media.runtime);
    } else if (this.media.episode_run_time) {
      this.mediaLongevity = this.media.episode_run_time;
    }
  }

  private loadSimilar(): void {
    this.dataService
      .getSimilarMedia(this.mediaType, this.media.id)
      .subscribe((res) => {
        this.similarMedia = res.results.slice(0, 8);

        this.dataService
          .getWatchList(this.accountId, this.session)
          .subscribe((listResp) => {
            const watchedIds = new Set(listResp.results.map((m) => m.id));

            this.similarMedia!.forEach((m) => {
              this.watchlistMap.set(m.id, watchedIds.has(m.id));
            });
          });
      });
  }

  private loadImages(): void {
    const id = this.media.id;
    this.dataService.getMediaImages(this.mediaType, id).subscribe((res) => {
      this.mediaImages = res.backdrops;
    });
  }

  private loadReview(): void {
    this.dataService
      .getMediaReviews(this.mediaType, this.media.id)
      .subscribe((res) => {
        this.mediaReviews = res.results;
      });
  }
}
