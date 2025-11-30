import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthFacade } from '../../auth/state/auth.facade';
import {MovieListFacade} from '../../../features/movies/state/movie-list.facade';
import {SearchDropdownComponent} from '../components/search-dropdown/search-dropdown.component';
import {filter} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, MatIconModule, SearchDropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private moviesFacade = inject(MovieListFacade)
  suggestions = this.moviesFacade.suggestions;
  menuOpen = false;
  searchOpen = false;
  @ViewChild('navbar', { static: true }) navbar!: ElementRef;
  constructor(    public auth: AuthFacade,
                  private router: Router) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.closeSearch()
      });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
  toggleSearch() {
    this.searchOpen = !this.searchOpen;
  }
  onSearch(value: string) {
    this.moviesFacade.setSearch(value);

  }
  closeSearch() {
    this.searchOpen = false;
    this.moviesFacade.setSearch('');
  }

  logout() {
    this.closeMenu();
    this.auth.logout();
  }
  ngAfterViewInit() {
    const height = this.navbar.nativeElement.offsetHeight;
    document.documentElement.style.setProperty('--navbar-height', height + 'px');
  }
}
