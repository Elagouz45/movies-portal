import { Injectable } from '@angular/core';
import { ErrorStrategy } from './error-strategy';

import { NetworkErrorStrategy } from './network-error.strategy';
import { BadRequestStrategy } from './bad-request.strategy';
import { UnauthorizedStrategy } from './unauthorized.strategy';
import { ForbiddenStrategy } from './forbidden.strategy';
import { NotFoundStrategy } from './not-found.strategy';
import { ServerErrorStrategy } from './server-error.strategy';
import { DefaultErrorStrategy } from './default-error.strategy';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerContext {

  private strategies: ErrorStrategy[] = [
    new NetworkErrorStrategy(),
    new BadRequestStrategy(),
    new UnauthorizedStrategy(),
    new ForbiddenStrategy(),
    new NotFoundStrategy(),
    new ServerErrorStrategy(),
    new DefaultErrorStrategy()
  ];

  getMessage(error: any): string {
    const strategy = this.strategies.find(s => s.supports(error.status));
    return strategy!.handle(error);
  }
}
