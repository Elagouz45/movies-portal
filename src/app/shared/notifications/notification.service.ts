// src/app/shared/notifications/notification.service.ts
import { Injectable, inject } from '@angular/core';
import { NotificationStrategy, NOTIFICATION_STRATEGY } from './notification-strategy';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private strategy = inject<NotificationStrategy>(NOTIFICATION_STRATEGY);

  success(msg: string) { this.strategy.success(msg); }
  error(msg: string)   { this.strategy.error(msg); }
  warning(msg: string) { this.strategy.warning(msg); }
  info(msg: string)    { this.strategy.info(msg); }
}
