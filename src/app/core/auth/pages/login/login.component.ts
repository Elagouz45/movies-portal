import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthFacade } from '../../state/auth.facade';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';

@Component({
  selector: 'app-login',

  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = signal('dev@tawzef.com');
  password = signal('dev123');
  hidePassword = signal(true);

  loading = signal(false);
  error = signal('');

  constructor(
    private authFacade: AuthFacade,
    private router: Router
  ) {}

  submit() {
    this.error.set('');
    this.loading.set(true);

    this.authFacade.login(this.email(), this.password()).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/movies']);
      },
      error: () => {
        this.loading.set(false);
        // this.error.set('Invalid email or password');
      }
    });
  }
}
