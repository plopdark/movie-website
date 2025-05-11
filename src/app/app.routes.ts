import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AccountComponent } from './pages/account/account.component';
import { RoutingEnum } from './utils/enums/routing.enum';
import { MediaTopPageComponent } from './pages/media-top-page/media-top-page.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { MediaShowPageComponent } from './pages/media-show-page/media-show-page.component';
import { PersonPageComponent } from './pages/person-page/person-page.component';
import { LoggedGuard } from './shared/guard/logged.guard';
import { PersonsTopPageComponent } from './pages/persons-top-page/persons-top-page.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { RatedComponent } from './pages/rated/rated.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: MainComponent,
  },
  {
    path: RoutingEnum.Auth,
    canActivate: [LoggedGuard],
    component: AuthComponent,
  },
  {
    path: RoutingEnum.User,
    canActivate: [AuthGuard],
    component: AccountComponent,
  },
  {
    path: RoutingEnum.Movies,
    canActivate: [AuthGuard],
    component: MediaTopPageComponent,
  },
  {
    path: RoutingEnum.TvSeries,
    canActivate: [AuthGuard],
    component: MediaTopPageComponent,
  },
  {
    path: `${RoutingEnum.MediaShow}/:type/:id`,
    canActivate: [AuthGuard],
    component: MediaShowPageComponent,
  },
  {
    path: `${RoutingEnum.Person}/:id`,
    canActivate: [AuthGuard],
    component: PersonPageComponent,
  },
  {
    path: `${RoutingEnum.Persons}`,
    canActivate: [AuthGuard],
    component: PersonsTopPageComponent,
  },
  {
    path: `${RoutingEnum.Watchlist}`,
    canActivate: [AuthGuard],
    component: WatchlistComponent,
  },
  {
    path: `${RoutingEnum.Rated}/:type`,
    canActivate: [AuthGuard],
    component: RatedComponent,
  },
];
