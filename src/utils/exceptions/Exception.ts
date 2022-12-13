import { ExceptionType } from './exception.helper';

export class Exception {
  constructor(readonly exception: ExceptionType, readonly message?: string) {}
}
