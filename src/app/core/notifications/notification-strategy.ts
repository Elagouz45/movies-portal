// src/app/shared/notifications/notification-strategy.ts
import { InjectionToken } from '@angular/core';

export interface NotificationStrategy {
  success(message: string): void;
  error(message: string): void;
  warning(message: string): void;
  info(message: string): void;
}

// هذا هو الـ DI Token اللي هنستخدمه في providers و inject
export const NOTIFICATION_STRATEGY =
  new InjectionToken<NotificationStrategy>('NOTIFICATION_STRATEGY');
