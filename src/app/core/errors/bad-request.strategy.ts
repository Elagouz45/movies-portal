import { ErrorStrategy } from './error-strategy';

export class BadRequestStrategy implements ErrorStrategy {
  supports(status: number): boolean {
    return status === 400;
  }

  handle(error: any): string {
    return error.error?.message || 'Bad request';
  }
}
