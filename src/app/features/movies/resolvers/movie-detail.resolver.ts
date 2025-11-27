import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { TmdbMovieDetail } from '../models/tmdb-movie.models';

export const MovieDetailResolver: ResolveFn<TmdbMovieDetail> = (route) => {
  const service = inject(MoviesService);
  const id = Number(route.paramMap.get('id'));
  return service.getMovieDetails(id);
};
