import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Icons } from '../../../../utils/enums/icons.enum';
import {
  CountryReleaseDates,
  Genre,
  Media,
  ReleaseDatesResp,
  TvContentRating,
  TvContentRatingResp,
} from '../../../../utils/interfaces/media.interface';
import { DataService } from '../../../services/data.service';
import { MediaType } from '../../../../utils/types/types';
import { RoutingEnum } from '../../../../utils/enums/routing.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-media-column-list-item',
  standalone: true,
  imports: [],
  templateUrl: './media-column-list-item.component.html',
  styleUrl: './media-column-list-item.component.scss',
})
export class MediaColumnListItemComponent implements OnChanges {
  @Input() public media?: Media;

  private dataService = inject(DataService);

  private router = inject(Router);

  public releaseDate: string = '';

  public genreList: string[] = [];

  public contentRating: string = '';

  public title: string = '';

  public bookMarkIcon: string = '';

  public isInWatchlist: boolean = false;

  public readonly goldStarIcon = Icons.GoldStarIcon;

  public readonly notInWatchlistIcon = Icons.WatchlistMarkerPlus;

  public readonly inWatchListIcon = Icons.BookmarkYellow;

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['media'] && this.media) {
      this.getReleaseDate();
      this.getMediaTitle();
      this.getGenres();
      this.updateIcon();
      this.getMediaRating();
    }
  }

  public onMediaClick(item: Media): void {
    const type: MediaType = item.title ? 'movie' : 'tv';
    this.router.navigate([RoutingEnum.MediaShow, type, item.id], {
      state: { media: item },
    });
  }

  private getMediaRating(): void {
    const id = this.media!.id;
    const isMovie = !!this.media!.title;

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

  private getMediaTitle(): void {
    if (this.media!.title) {
      this.title = this.media!.title;
    } else if (this.media!.name) {
      this.title = this.media!.name;
    }
  }

  private getReleaseDate(): void {
    if (this.media?.release_date!) {
      this.releaseDate = this.media.release_date.slice(0, 4);
    } else if (this.media?.first_air_date!) {
      this.releaseDate = this.media.first_air_date.slice(0, 4);
    }
  }

  private getGenres(): void {
    this.dataService.getAllGenres().subscribe((res) => {
      const genres: Genre[] = res.genres;
      this.genreList = this.media!.genre_ids.map(
        (id) => genres.find((g) => g.id === id)?.name,
      ).filter((name): name is string => !!name);
    });
  }

  private updateIcon() {
    this.bookMarkIcon = this.isInWatchlist
      ? this.inWatchListIcon
      : this.notInWatchlistIcon;
  }
}
