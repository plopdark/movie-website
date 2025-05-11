import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { Icons } from '../../../utils/enums/icons.enum';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RoutingEnum } from '../../../utils/enums/routing.enum';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import {
  MovieResult,
  MultiResult,
  MultiSearchResp,
  PersonResult,
  TvResult,
} from '../../../utils/interfaces/media.interface';
import { debounceTime, distinctUntilChanged, filter, Subject } from 'rxjs';
import { MediaType } from '../../../utils/types/types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, NgIf, NgForOf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);

  private auth = inject(AuthService);

  private dataService = inject(DataService);

  private elRef = inject(ElementRef<HTMLElement>);

  public userName: string = '';

  public searchQuery: string = '';

  public searchResults: MultiSearchResp['results'] = [];

  private search$ = new Subject<string>();

  public readonly logo = Icons.Logo;

  public readonly watchlist = Icons.WatchlistMarker;

  public readonly userIcon = Icons.UserIcon;

  public readonly magnifier = Icons.MagnifierIcon;

  public ngOnInit() {
    this.auth.getUser().subscribe((user) => (this.userName = user.username));

    this.search$
      .pipe(
        filter((query) => query.length > 1),
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((query) => {
        this.dataService.searchMulti(query).subscribe((res) => {
          this.searchResults = res.results;
        });
      });
  }

  @HostListener('window:click', ['$event'])
  public clickOutside(event: MouseEvent): void {
    const clickedInside = this.elRef.nativeElement.contains(
      event.target as Node,
    );

    if (!clickedInside) {
      this.clearSearch();
    }
  }

  public onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.searchQuery = value;
    if (value.length > 1) {
      this.search$.next(value);
    } else {
      this.searchResults = [];
    }
  }

  public onClickMedia(item: MovieResult | TvResult): void {
    const type: MediaType = item.media_type;
    this.router.navigate([RoutingEnum.MediaShow, type, item.id], {
      state: { media: item },
    });
    this.clearSearch();
  }

  public onClickPerson(item: PersonResult): void {
    this.router.navigate([RoutingEnum.MediaShow, item.id], {
      state: { media: item },
    });
    this.clearSearch();
  }

  public onClickItem(item: MultiResult): void {
    if (item.media_type === 'movie' || item.media_type === 'tv') {
      this.onClickMedia(item);
    } else {
      this.onClickPerson(item);
    }
  }

  public navigateToHomePage(): void {
    this.router.navigate(['']);
  }

  public navigateToAccountPage(): void {
    this.router.navigate([RoutingEnum.User]);
  }

  public navigateToMoviesPage(): void {
    this.router.navigate([RoutingEnum.Movies]);
  }

  public navigateToTvSeriesPage(): void {
    this.router.navigate([RoutingEnum.TvSeries]);
  }

  public navigateToPersonsPage(): void {
    this.router.navigate([RoutingEnum.Persons]);
  }

  public navigateToWatchlistPage(): void {
    this.router.navigate([RoutingEnum.Watchlist]);
  }

  private clearSearch() {
    this.searchQuery = '';
    this.searchResults = [];
  }
}
