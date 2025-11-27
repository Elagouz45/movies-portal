import { ErrorStrategy } from './error-strategy';

export class DefaultErrorStrategy implements ErrorStrategy {
  supports(): boolean {
    return true; // fallback if no strategy matches
  }

  handle(): string {
    return 'Something went wrong. Please try again.';
  }
}
