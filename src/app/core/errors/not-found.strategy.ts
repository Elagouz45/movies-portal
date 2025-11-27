import { ErrorStrategy } from './error-strategy';

export class NotFoundStrategy implements ErrorStrategy {
  supports(status: number): boolean {
    return status === 404;
  }

  handle(): string {
    return 'Resource not found.';
  }
}
