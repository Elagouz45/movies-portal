import { ErrorStrategy } from './error-strategy';

export class UnauthorizedStrategy implements ErrorStrategy {
  supports(status: number): boolean {
    return status === 401;
  }

  handle(): string {
    return 'Unauthorized — Please login again.';
  }
}
