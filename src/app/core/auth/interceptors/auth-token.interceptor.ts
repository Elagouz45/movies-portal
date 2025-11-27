import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthFacade } from '../state/auth.facade';
import { AuthService } from '../services/auth.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthFacade);
  const authService = inject(AuthService);

  const accessToken = auth.getAccessToken();
  const refreshToken = auth.getRefreshToken();

  // No token added for login or refresh routes
  const skip =
    req.url.includes('/login') ||
    req.url.includes('/refresh');

  let authReq = req;

  if (!skip && accessToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {

      if (err.status !== 401) return throwError(() => err);

      if (!refreshToken) {
        auth.logout();
        return throwError(() => err);
      }

      // Try refresh token
      return authService.refreshToken(refreshToken).pipe(
        switchMap((newTokens) => {

          auth.updateTokens(newTokens);

          const retry = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newTokens.accessToken}`
            }
          });

          return next(retry);
        }),
        catchError(() => {
          auth.logout();
          return throwError(() => err);
        })
      );
    })
  );
};
