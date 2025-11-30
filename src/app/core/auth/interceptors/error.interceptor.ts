import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import {ErrorHandlerContext} from '../../errors/error-handler.context';
import {NotificationService} from '../../notifications/notification.service';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const errorContext = inject(ErrorHandlerContext);
  const notifier = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      const message = errorContext.getMessage(error);
      notifier.error(message);

      return throwError(() => error);
    })
  );
};
