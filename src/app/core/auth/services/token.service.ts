import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  save(tokens: { access_token: string; refresh_token: string }) {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  }

  getTokens() {
    const access = localStorage.getItem('access_token');
    const refresh = localStorage.getItem('refresh_token');

    if (!access || !refresh) return null;

    return {
      accessToken: access,
      refreshToken: refresh
    };
  }

  clear() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
