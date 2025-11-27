import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { TmdbCreditsResponse } from '../models/tmdb-movie.models';

export const MovieCastResolver: ResolveFn<TmdbCreditsResponse> = (route) => {
  const service = inject(MoviesService);
  const id = Number(route.paramMap.get('id'));
  return service.getMovieCast(id);
};
