import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface TmdbMovieDetail {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: any | null;
  budget: number;

  genres: {
    id: number;
    name: string;
  }[];

  homepage: string | null;
  id: number;
  imdb_id: string | null;

  origin_country: string[];
  original_language: string;
  original_title: string;

  overview: string;
  popularity: number;

  poster_path: string | null;

  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];

  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];

  release_date: string;
  revenue: number;
  runtime: number | null;

  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];

  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface TmdbMovieSummary {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}
export interface TmdbMovieListResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: TmdbMovieSummary[];
}
export interface TmdbCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface TmdbCreditsResponse {
  id: number;
  cast: TmdbCastMember[];
}

export interface TmdbMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

export interface TmdbResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}
