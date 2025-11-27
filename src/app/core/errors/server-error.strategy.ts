import { ErrorStrategy } from './error-strategy';

export class ServerErrorStrategy implements ErrorStrategy {
  supports(status: number): boolean {
    return status === 500;
  }

  handle(): string {
    return 'Internal server error.';
  }
}
