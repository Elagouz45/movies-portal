import { Routes } from '@angular/router';
import {AUTH_ROUTES} from './core/auth/auth.routes';
import {AuthGuard} from './core/auth/guards/auth.guard';

export const routes: Routes = [
  ...AUTH_ROUTES,   // 👈 Load /login route from core/auth
  {
    path: 'movies',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/movies/movies.routes').then(m => m.MOVIES_ROUTES)
  },
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: '**', redirectTo: 'movies' }
];
