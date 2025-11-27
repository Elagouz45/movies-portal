import { ErrorStrategy } from './error-strategy';

export class ForbiddenStrategy implements ErrorStrategy {
  supports(status: number): boolean {
    return status === 403;
  }

  handle(): string {
    return 'Access denied. You do not have permission.';
  }
}
