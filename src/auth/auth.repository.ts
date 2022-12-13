import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { User } from 'src/user/entities/user.entity';

import { Exception } from 'src/utils/exceptions/Exception';
import { ExceptionType } from 'src/utils/exceptions/exception.helper';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUser(username: string): Promise<User> {
    try {
      return this.prisma.user.findUnique({ where: { username } });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }
}
