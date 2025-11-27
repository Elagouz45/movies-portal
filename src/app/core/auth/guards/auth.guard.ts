import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthFacade } from '../state/auth.facade';

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthFacade);
  const router = inject(Router);

  return auth.isLoggedIn() ? true : router.parseUrl('/login');
};
