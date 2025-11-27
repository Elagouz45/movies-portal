import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  api = 'http://localhost:3000';

  login(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.api}/login`, payload);
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(`${this.api}/refresh`, { refreshToken });
  }
}
