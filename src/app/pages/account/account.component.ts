import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { AuthService } from '../../shared/services/auth.service';
import { Media, RatedMedia } from '../../utils/interfaces/media.interface';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { user } from '../../utils/interfaces/auth.interface';
import { Icons } from '../../utils/enums/icons.enum';
import { MediaType } from '../../utils/types/types';
import { RoutingEnum } from '../../utils/enums/routing.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  private data = inject(DataService);

  private auth = inject(AuthService);

  private router = inject(Router);

  public user?: user;

  public watchList: Media[] = [];

  private id: number = 21967768;

  public session = localStorage.getItem('session_id');

  public ratedMovies: RatedMedia[] = [];

  public ratedTvs: RatedMedia[] = [];

  public readonly filledStar = Icons.GoldStarIcon;

  public readonly arrowLeft = Icons.ArrowLeft;

  public readonly blueStar = Icons.BlueStar;

  public ngOnInit() {
    this.getUser();
    this.getWatchlist();
    this.getRatedMedia();
  }

  public onMediaClick(item: Media): void {
    const type: MediaType = item.title ? 'movie' : 'tv';
    this.router.navigate([RoutingEnum.MediaShow, type, item.id], {
      state: { media: item },
    });
  }

  private getUser(): void {
    this.auth.getUser().subscribe((res) => {
      this.user = res;
    });
  }

  private getWatchlist(): void {
    this.data.getWatchList(this.id, this.session!).subscribe((res) => {
      this.watchList = res.results;
      console.log(this.watchList);
    });
  }

  private getRatedMedia(): void {
    this.data.getAccountRatedMedia('movies', this.id).subscribe((res) => {
      this.ratedMovies = res.results;
    });

    this.data.getAccountRatedMedia('tv', this.id).subscribe((res) => {
      this.ratedTvs = res.results;
    });
  }
}
