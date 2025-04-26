import {Component, inject} from '@angular/core';
import {Icons} from '../../../utils/enums/icons.enum';
import {NgOptimizedImage} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {RoutingEnum} from '../../../utils/enums/routing.enum';

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
export class HeaderComponent {
  private router = inject(Router)

  public readonly logo = Icons.Logo;
  public readonly watchlist = Icons.WatchlistMarker;
  public readonly userIcon = Icons.UserIcon;
  public readonly magnifier = Icons.MagnifierIcon

  public navigateToAccountPage(): void {
    this.router.navigate([RoutingEnum.user])
  }
}
