import { Component, effect, signal, computed } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { TmdbMovieListResponse, TmdbMovieSummary } from '../../models/tmdb-movie.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {

  // --- SIGNAL STATE ---
  movies = signal<TmdbMovieSummary[]>([]);
  totalPages = signal(1);

  page = signal(1);
  query = signal('');

  constructor(private moviesService: MoviesService) {

    // Auto-load when page changes AND query changes
    effect(() => {

      const currentPage = this.page();
      const searchText = this.query().trim();

      if (searchText.length > 0) {
        this.loadSearch(searchText, currentPage);
      } else {
        this.loadPopular(currentPage);
      }
    });
  }

  // --- API CALLS USING SERVICE ---

  private loadPopular(page: number) {
    this.moviesService.getPopularMovies(page).subscribe({
      next: (res: TmdbMovieListResponse) => {
        this.movies.set(res.results);
        this.totalPages.set(res.total_pages);
      }
    });
  }

  private loadSearch(query: string, page: number) {
    this.moviesService.searchMovies(query, page).subscribe({
      next: (res: TmdbMovieListResponse) => {
        this.movies.set(res.results);
        this.totalPages.set(res.total_pages);
      }
    });
  }

  // --- UI ACTIONS ---

  updateSearch(value: string) {
    this.query.set(value);
    this.page.set(1); // reset page on new search
  }

  nextPage() {
    if (this.page() < this.totalPages()) {
      this.page.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update(p => p - 1);
    }
  }

}
