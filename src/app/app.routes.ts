import { Routes } from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {AccountComponent} from './pages/account/account.component';
import {RoutingEnum} from './utils/enums/routing.enum';
import {MediaPageComponent} from './pages/media-page/media-page.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: RoutingEnum.User, component: AccountComponent },
  { path: RoutingEnum.Movies, component: MediaPageComponent},
  { path: RoutingEnum.TvSeries, component: MediaPageComponent}
];
