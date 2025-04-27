import { Routes } from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {AccountComponent} from './pages/account/account.component';
import {RoutingEnum} from './utils/enums/routing.enum';
import {MediaPageComponent} from './pages/media-page/media-page.component';
import {AuthComponent} from './pages/auth/auth.component';
import {AuthGuard} from './shared/guard/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', canActivate: [AuthGuard], component: MainComponent, },
  { path: RoutingEnum.Auth, component: AuthComponent },
  { path: RoutingEnum.User, canActivate: [AuthGuard], component: AccountComponent },
  { path: RoutingEnum.Movies, canActivate: [AuthGuard], component: MediaPageComponent},
  { path: RoutingEnum.TvSeries, canActivate: [AuthGuard], component: MediaPageComponent},
];
