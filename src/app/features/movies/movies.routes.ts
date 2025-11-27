import { Routes } from '@angular/router';
import { MovieDetailResolver } from './resolvers/movie-detail.resolver';
import { MovieCastResolver } from './resolvers/movie-cast.resolver';

export const MOVIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/movie-list/movie-list.component').then(m => m.MovieListComponent)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/movie-detail/movie-detail.component').then(m => m.MovieDetailComponent),
    resolve: {
      movie: MovieDetailResolver,
      cast: MovieCastResolver
    }
  }
];
