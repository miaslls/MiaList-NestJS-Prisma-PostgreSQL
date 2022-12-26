import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

import { List } from 'src/list/entities/list.entity';

import { Exception } from 'src/utils/exceptions/Exception';
import { ExceptionType } from 'src/utils/exceptions/exception.helper';

@Injectable()
export class HomeRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly listSelect = {
    user: true,
    category: true,
    tags: true,
    entries: true,
    _count: {
      select: {
        tags: true,
        entries: true,
      },
    },
  };

  async findPinnedLists(userId: string): Promise<List[]> {
    try {
      return await this.prisma.list.findMany({
        where: { userId, pinned: true },
        include: this.listSelect,
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
        include: this.listSelect,
        orderBy: { title: 'asc' },
      });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }
}
