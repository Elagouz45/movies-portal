import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  TmdbMovieListResponse,
  TmdbMovieDetail,
  TmdbCreditsResponse, TmdbResponse
} from '../models/tmdb-movie.models';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private api = environment.tmdbApiUrl;
  private key = environment.tmdbApiKey;

  constructor(private http: HttpClient) {}

  getPopular(page: number): Observable<TmdbResponse> {
    return this.http.get<TmdbResponse>(
      `${this.api}/movie/popular?page=${page}&api_key=${environment.tmdbApiKey}`
    );
  }

  search(query: string, page: number): Observable<TmdbResponse> {
    return this.http.get<TmdbResponse>(
      `${this.api}/search/movie?query=${query}&page=${page}&api_key=${environment.tmdbApiKey}`
    );
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
