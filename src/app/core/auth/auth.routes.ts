import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent)
  }
];
