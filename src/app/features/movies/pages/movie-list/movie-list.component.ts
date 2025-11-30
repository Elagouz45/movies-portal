import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import {MovieListFacade} from '../../state/movie-list.facade';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-movie-list',

  imports: [CommonModule, MovieCardComponent, MatProgressSpinner, MatInput, MatIcon],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  @ViewChild('scrollAnchor', { static: true }) scrollAnchor!: ElementRef;

  private observer!: IntersectionObserver;

  constructor(public facade: MovieListFacade) {}

  ngOnInit() {
    this.facade.loadPopular();
    this.setupInfiniteScroll();
  }

  /** ------------------------------
   * Infinite Scroll using Observer
   * ------------------------------ */
  setupInfiniteScroll() {
    this.observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        if (!this.facade.loading() && this.facade.page() < this.facade.totalPages()) {
          // alert('ds')
          this.facade.loadMore();
        }
      }
    }, {
      root: null,      // viewport
      threshold: 0.5   // trigger when 50% visible
    });

    this.observer.observe(this.scrollAnchor.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
