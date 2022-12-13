import { ExceptionType } from './exception.helper';

export interface IException {
  message?: string;
  exception: ExceptionType;
}
