import { Injectable, signal, computed } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';
import { AuthStorageService } from '../services/auth-storage.service';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthFacade {

  private _user = signal<AuthUser | null>(null);
  user = computed(() => this._user());

  private _isLoggedIn = signal<boolean>(false);
  isLoggedIn = computed(() => this._isLoggedIn());

  constructor(
    private authService: AuthService,
    private storage: AuthStorageService
  ) {
    this.restoreSession();
  }

  /** LOGIN + SAVE USER + TOKENS */
  login(email: string, password: string) {
    return this.authService.login({ email, password }).pipe(
      tap((res) => {

        // Save tokens
        this.storage.saveTokens(res.accessToken, res.refreshToken);

        // Save user
        this.storage.saveUser(res.user);

        // Signals state
        this._user.set(res.user);
        this._isLoggedIn.set(true);
      })
    );
  }

  /** RESTORE SESSION ON APP RELOAD */
  private restoreSession() {
    const access = this.storage.getAccess();
    const refresh = this.storage.getRefresh();
    const savedUser = this.storage.getSavedUser();

    if (access && refresh && savedUser) {
      this._user.set(savedUser);
      this._isLoggedIn.set(true);
    } else {
      this.logout();
    }
  }

  /** UPDATED TOKENS AFTER REFRESH */
  updateTokens(tokens: { accessToken: string; refreshToken: string }) {
    this.storage.saveTokens(tokens.accessToken, tokens.refreshToken);
  }

  /** ACCESS FOR INTERCEPTORS */
  getAccessToken(): string | null {
    return this.storage.getAccess();
  }

  getRefreshToken(): string | null {
    return this.storage.getRefresh();
  }

  /** LOGOUT */
  logout() {
    this.storage.clear();
    this._user.set(null);
    this._isLoggedIn.set(false);
  }
}
