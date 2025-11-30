import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TmdbMovieDetail} from '../../models/tmdb-movie.models';

@Component({
  selector: 'movie-sidebar',

  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class MovieSidebarComponent {
  @Input() movie!: TmdbMovieDetail;
}
