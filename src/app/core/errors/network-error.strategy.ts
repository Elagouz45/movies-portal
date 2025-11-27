import { ErrorStrategy } from './error-strategy';

export class NetworkErrorStrategy implements ErrorStrategy {
  supports(status: number): boolean {
    return status === 0;
  }

  handle(): string {
    return 'Network error. Please check your connection.';
  }
}
