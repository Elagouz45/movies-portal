import { Injectable } from '@angular/core';
import { of, delay, Observable } from 'rxjs';
import { IAuthTokens } from '../models/tokens.model';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class RefreshTokenService {

  constructor(private tokenStore: TokenService) {}

  refresh(): Observable<IAuthTokens> {
    const newTokens: IAuthTokens = {
      accessToken: 'refreshed-access-token',
      refreshToken: 'refreshed-refresh-token'
    };

    this.tokenStore.save(newTokens);

    return of(newTokens).pipe(delay(300));
  }
}
