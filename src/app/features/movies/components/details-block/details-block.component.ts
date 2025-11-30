import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TmdbMovieDetail} from '../../models/tmdb-movie.models';

@Component({
  selector: 'movie-details-block',

  imports: [CommonModule],
  templateUrl: './details-block.component.html',
  styleUrl: './details-block.component.scss'
})
export class MovieDetailsBlockComponent {
  @Input() movie!: TmdbMovieDetail;
  @Input() countries = '';
  @Input() languages = '';
  @Input() companies = '';
}
