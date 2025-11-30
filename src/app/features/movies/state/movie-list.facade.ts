import { Injectable, signal, computed } from '@angular/core';
import { TmdbMovie, TmdbResponse } from '../models/tmdb-movie.models';
import { MoviesService } from '../services/movies.service';

@Injectable({ providedIn: 'root' })
export class MovieListFacade {

  // STATE ------------------------------------
  private _movies = signal<TmdbMovie[]>([]);
  movies = computed(() => this._movies());

  private _page = signal(1);
  page = computed(() => this._page());

  private _query = signal('');
  query = computed(() => this._query());

  private _totalPages = signal(1);
  totalPages = computed(() => this._totalPages());

  private _loading = signal(false);
  loading = computed(() => this._loading());
  private _suggestions = signal<TmdbMovie[]>([]);
  suggestions = computed(() => this._suggestions());

  // Debounce timer
  private debounceTimer: any = null;

  constructor(private moviesService: MoviesService) {}
  searchSuggestions(query: string) {
    if (!query.trim()) {
      this._suggestions.set([]);
      return;
    }

    this.moviesService.search(query, 1).subscribe({
      next: (res: TmdbResponse) => {
        this._suggestions.set(res.results);
      }
    });
  }

  // ==========================================
  // 🔍 SEARCH TRIGGERED FROM NAVBAR OR PAGE
  // ==========================================
  setSearch(query: string) {
    this._query.set(query);
    this._page.set(1);
    this._movies.set([]);
    this.searchSuggestions(query);
    // clear previous debounce
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Debounce 300ms
    this.debounceTimer = setTimeout(() => {
      if (query.trim().length > 0) {
        this.searchMovies();
      } else {
        this.loadPopular(true);
      }
    }, 300);
  }

  // ==========================================
  // ⭐ LOAD POPULAR MOVIES
  // ==========================================
  loadPopular(reset = false) {
    if (reset) {
      this._movies.set([]);
      this._page.set(1);
    }

    this._loading.set(true);

    this.moviesService.getPopular(this.page()).subscribe({
      next: (res: TmdbResponse) => {
        this._movies.update(list => [...list, ...res.results]);
        this._totalPages.set(res.total_pages);
        this._loading.set(false);
      },
      error: () => this._loading.set(false)
    });
  }

  // ==========================================
  // 🔍 SEARCH MOVIES
  // ==========================================
  searchMovies() {
    if (!this.query().trim()) return;

    this._loading.set(true);

    this.moviesService.search(this.query(), this.page()).subscribe({
      next: (res: TmdbResponse) => {
        this._movies.update(list => [...list, ...res.results]);
        this._totalPages.set(res.total_pages);
        this._loading.set(false);
      },
      error: () => this._loading.set(false)
    });
  }

  // ==========================================
  // 📌 LOAD MORE (INFINITE SCROLL)
  // ==========================================
  loadMore() {
    if (this.page() >= this.totalPages()) return;

    this._page.update(p => p + 1);

    if (this.query().trim().length > 0) {
      this.searchMovies();
    } else {
      this.loadPopular();
    }
  }

  // ==========================================
  // ♻ RESET STATE
  // ==========================================
  reset() {
    this._movies.set([]);
    this._page.set(1);
    this._query.set('');
    this._loading.set(false);
  }
}
