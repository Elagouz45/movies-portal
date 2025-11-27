import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  TmdbMovieListResponse,
  TmdbMovieDetail,
  TmdbCreditsResponse
} from '../models/tmdb-movie.models';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private api = environment.tmdbApiUrl;
  private key = environment.tmdbApiKey;

  constructor(private http: HttpClient) {}

  getPopularMovies(page: number = 1) {
    return this.http.get<TmdbMovieListResponse>(`${this.api}/movie/popular`, {
      params: {
        api_key: this.key,
        page
      }
    });
  }

  searchMovies(query: string, page: number = 1) {
    return this.http.get<TmdbMovieListResponse>(`${this.api}/search/movie`, {
      params: {
        api_key: this.key,
        query,
        page
      }
    });
  }

  getMovieDetails(movieId: number) {
    return this.http.get<TmdbMovieDetail>(`${this.api}/movie/${movieId}`, {
      params: { api_key: this.key }
    });
  }

  getMovieCast(movieId: number) {
    return this.http.get<TmdbCreditsResponse>(`${this.api}/movie/${movieId}/credits`, {
      params: { api_key: this.key }
    });
  }
}
