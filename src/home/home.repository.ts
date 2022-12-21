import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

import { List } from 'src/list/entities/list.entity';

import { Exception } from 'src/utils/exceptions/Exception';
import { ExceptionType } from 'src/utils/exceptions/exception.helper';

@Injectable()
export class HomeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPinnedLists(userId: string): Promise<List[]> {
    try {
      return await this.prisma.list.findMany({
        where: { userId, pinned: true },
        orderBy: { title: 'asc' },
      });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async findUnpinnedLists(userId: string): Promise<List[]> {
    try {
      return await this.prisma.list.findMany({
        where: { userId, pinned: false },
        orderBy: { title: 'asc' },
      });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }
}
