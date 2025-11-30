import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoaderService} from './core/auth/services/loader.service';
import {LoaderComponent} from './shared/components/loader/loader.component';
import {NgIf} from '@angular/common';
import {NavbarComponent} from './core/layout/navbar/navbar.component';
import {AuthFacade} from './core/auth/state/auth.facade';
import {routeTransition} from './core/animations/route-animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent, NgIf, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [routeTransition]
})
export class AppComponent {
  title = 'movies_portal';
  loader = inject(LoaderService).isLoading;
  public authFacade = inject(AuthFacade);
  prepare(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
