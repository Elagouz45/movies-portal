import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';

/* Child Components */
import { HeroComponent } from '../../components/hero/hero.component';
import { CastComponent } from '../../components/cast/cast.component';
import { MovieDetailsBlockComponent } from '../../components/details-block/details-block.component';
import { MovieSidebarComponent } from '../../components/sidebar/sidebar.component';
import { SkeletonDetailComponent } from '../../components/skeleton-detail/skeleton-detail.component';
import {TmdbMovieDetail} from '../../models/tmdb-movie.models';

@Component({
  selector: 'app-movie-detail',

  imports: [
    CommonModule,
    HeroComponent,
    CastComponent,
    MovieDetailsBlockComponent,
    MovieSidebarComponent,
    SkeletonDetailComponent
  ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent {

  private route = inject(ActivatedRoute);
  private moviesService = inject(MoviesService);

  /** Main Movie Data */
  movie = signal<TmdbMovieDetail | null>(null);

  /** Cast */
  cast = signal<any[]>([]);

  /** Loading State (Skeleton) */
  loading = signal(true);

  constructor() {
    // Movie resolver
    this.route.data.subscribe(({ movie }) => {
      this.movie.set(movie);

      // Fetch cast
      this.fetchCast(movie.id);

      // Show skeleton for small duration
      setTimeout(() => this.loading.set(false), 300);
    });
  }

  /** Calling Credits API */
  private fetchCast(id: number) {
    this.moviesService.getMovieCast(id).subscribe((res) => {
      this.cast.set(res.cast || []);
    });
  }

  /** Computed UI Helpers */
  productionCountries = computed(() =>
    this.movie()?.production_countries?.map((c) => c.name).join(', ') || ''
  );

  spokenLanguages = computed(() =>
    this.movie()?.spoken_languages?.map((l) => l.english_name).join(', ') || ''
  );

  productionCompanies = computed(() =>
    this.movie()?.production_companies?.map((c) => c.name).join(', ') || ''
  );
}
