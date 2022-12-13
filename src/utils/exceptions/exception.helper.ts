import {
  InternalServerErrorException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';

import { IException } from './IException';

export enum ExceptionType {
  INTERNAL_SERVER_ERROR,
  RESOURCE_NOT_FOUND,
  DATA_INVALID,
  UNAUTHORIZED,
  FORBIDDEN,
}

export function HandleException({ exception, message }: IException) {
  switch (exception) {
    case ExceptionType.INTERNAL_SERVER_ERROR:
      throw new InternalServerErrorException(message ? message : 'INTERNAL SERVER ERROR');
    case ExceptionType.RESOURCE_NOT_FOUND:
      throw new BadRequestException(message ? message : 'RESOURCE NOT FOUND');
    case ExceptionType.DATA_INVALID:
      throw new BadRequestException(message ? message : 'DATA INVALID');
    case ExceptionType.UNAUTHORIZED:
      throw new UnauthorizedException(message ? message : 'UNAUTHORIZED');
    case ExceptionType.FORBIDDEN:
      throw new ForbiddenException(message ? message : 'INSUFFICIENT PRIVILEGES');
  }
}
