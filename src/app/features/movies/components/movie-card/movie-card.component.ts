import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {TmdbMovie} from '../../models/tmdb-movie.models';

@Component({
  selector: 'app-movie-card',

  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  @Input() movie!: TmdbMovie;

  get posterUrl() {
    return this.movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
      : '/assets/images/placeholder-poster.png';
  }
}
