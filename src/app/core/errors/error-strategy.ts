export interface ErrorStrategy {
  supports(status: number): boolean;
  handle(error: any): string;
}
