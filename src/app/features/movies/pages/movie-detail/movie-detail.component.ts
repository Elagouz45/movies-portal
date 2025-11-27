import {Component, OnInit, signal} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbMovieDetail } from '../../models/tmdb-movie.models';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movie!: TmdbMovieDetail;
  cast: any[] = [];
  spokenLanguages = signal('');
  productionCountries = signal('');
  productionCompanies = signal('');
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.movie = data['movie'];
      this.cast = data['cast']?.cast || [];
      // -- Derived signals --
      this.spokenLanguages.set(
        this.movie.spoken_languages.map(l => l.english_name).join(', ')
      );

      this.productionCountries.set(
        this.movie.production_countries.map(c => c.name).join(', ')
      );

      this.productionCompanies.set(
        this.movie.production_companies.map(c => c.name).join(', ')
      );
    });
  }
}
