// src/app/shared/notifications/material-snackbar.strategy.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationStrategy } from './notification-strategy';

@Injectable()
export class MaterialSnackbarStrategy implements NotificationStrategy {

  constructor(private snackBar: MatSnackBar) {}

  private open(message: string, panelClass: string[]) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass
    });
  }

  success(message: string): void {
    this.open(message, ['toast-success']);
  }
  error(message: string): void {
    this.open(message, ['toast-error']);
  }
  warning(message: string): void {
    this.open(message, ['toast-warning']);
  }
  info(message: string): void {
    this.open(message, ['toast-info']);
  }
}
