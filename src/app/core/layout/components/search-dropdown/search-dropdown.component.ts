import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MovieListFacade} from '../../../../features/movies/state/movie-list.facade';
import {AuthFacade} from '../../../auth/state/auth.facade';

@Component({
  selector: 'app-search-dropdown',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.scss'],
})
export class SearchDropdownComponent {
  private moviesFacade = inject(MovieListFacade)
  suggestions = this.moviesFacade.suggestions;
  searchOpen = false;

  constructor(    public auth: AuthFacade,
                  private router: Router) {}

  goToMovie(id: number) {
    this.router.navigate(['/movies', id]);
    this.closeDropdown()
  }

  closeDropdown() {
    this.searchOpen = false;
  }
}
