import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoaderService} from './core/auth/services/loader.service';
import {LoaderComponent} from './shared/components/loader/loader.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'movies_portal';
  loader = inject(LoaderService).isLoading;

}
