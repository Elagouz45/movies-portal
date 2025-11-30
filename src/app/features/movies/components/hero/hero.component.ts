import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TmdbMovieDetail} from '../../models/tmdb-movie.models';

@Component({
  selector: 'movie-hero',

  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  @Input() movie!: TmdbMovieDetail;
}
