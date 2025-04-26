import { Routes } from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {AccountComponent} from './pages/account/account.component';
import {RoutingEnum} from './utils/enums/routing.enum';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: RoutingEnum.user, component: AccountComponent },
];
