import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authTokenInterceptor} from './core/auth/interceptors/auth-token.interceptor';
import {loaderInterceptor} from './core/auth/interceptors/loader.interceptor';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NOTIFICATION_STRATEGY} from './core/notifications/notification-strategy';
import {MaterialSnackbarStrategy} from './core/notifications/material-snackbar.strategy';
import {errorInterceptor} from './core/auth/interceptors/error.interceptor';
import {provideAnimations} from '@angular/platform-browser/animations';

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
    provideRouter(routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top', // 👈 always scroll to top
        anchorScrolling: 'enabled'
      })),
    provideAnimations()
  ]
};
