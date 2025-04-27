import {Component, inject, OnInit} from '@angular/core';
import {Icons} from '../../../utils/enums/icons.enum';
import {NgOptimizedImage} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {RoutingEnum} from '../../../utils/enums/routing.enum';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private router = inject(Router)

  private auth = inject(AuthService);

  public userName: string = '';

  public readonly logo = Icons.Logo;

  public readonly watchlist = Icons.WatchlistMarker;

  public readonly userIcon = Icons.UserIcon;

  public readonly magnifier = Icons.MagnifierIcon

  public ngOnInit() {
    this.auth.getUser().subscribe(user=>this.userName = user.username);
  }

  public navigateToHomePage(): void {
    this.router.navigate([''])
  }

  public navigateToAccountPage(): void {
    this.router.navigate([RoutingEnum.User])
  }

  public navigateToMoviesPage(): void {
    this.router.navigate([RoutingEnum.Movies])
  }

  public navigateToTvSeriesPage(): void {
    this.router.navigate([RoutingEnum.TvSeries])
  }
}
