import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authTokenInterceptor} from './core/auth/interceptors/auth-token.interceptor';
import {loaderInterceptor} from './core/auth/interceptors/loader.interceptor';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NOTIFICATION_STRATEGY} from './shared/notifications/notification-strategy';
import {MaterialSnackbarStrategy} from './shared/notifications/material-snackbar.strategy';
import {errorInterceptor} from './core/auth/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // عشان MatSnackBar يشتغل كـ service
    importProvidersFrom(MatSnackBarModule),
    {provide: NOTIFICATION_STRATEGY, useClass: MaterialSnackbarStrategy},
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(
      withInterceptors([
        loaderInterceptor,
        authTokenInterceptor,
        errorInterceptor
      ])
    ),
    provideRouter(routes),
  ]
};
