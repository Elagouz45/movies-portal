import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthStorageService {

  saveTokens(access: string, refresh: string) {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  getAccess() {
    return localStorage.getItem('access_token');
  }

  getRefresh() {
    return localStorage.getItem('refresh_token');
  }

  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getSavedUser() {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  }

  clear() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }
}
