import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'movie-cast',

  imports: [CommonModule],
  templateUrl: './cast.component.html',
  styleUrl: './cast.component.scss'
})
export class CastComponent {
  @Input() cast: any[] = [];
}
