import { Component, inject, OnInit } from '@angular/core';
import { Icons } from '../../../utils/enums/icons.enum';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RoutingEnum } from '../../../utils/enums/routing.enum';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import {
  Media,
  MultiSearchResp,
} from '../../../utils/interfaces/movie.interface';
import { debounceTime, distinctUntilChanged, filter, Subject } from 'rxjs';
import { MediaType } from '../../../utils/types/types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, NgForOf, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);

  private auth = inject(AuthService);

  private dataService = inject(DataService);

  public userName: string = '';

  public searchQuery: string = '';

  public searchResults: MultiSearchResp['results'] = [];

  private search$ = new Subject<string>();

  private mediaType?: MediaType;

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

    if (this.searchResults.map((el) => el.title)) {
      this.mediaType = 'movie';
    } else {
      this.mediaType = 'tv';
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

  public onClickMedia(item: Media): void {
    const type: MediaType = item.title ? 'movie' : 'tv';
    this.router.navigate([RoutingEnum.MediaShow, type, item.id], {
      state: { media: item },
    });
    this.searchQuery = '';
    this.searchResults = [];
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
}
