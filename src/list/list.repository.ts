import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

import { Exception } from 'src/utils/exceptions/Exception';
import { ExceptionType } from 'src/utils/exceptions/exception.helper';

import { List } from './entities/list.entity';

@Injectable()
export class ListRepository {
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

  async create(data: Prisma.ListUncheckedCreateInput): Promise<List> {
    try {
      return this.prisma.list.create({ data });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(userId: string): Promise<List[]> {
    try {
      return this.prisma.list.findMany({
        where: { userId },
        include: this.listSelect,
      });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<List> {
    try {
      return this.prisma.list.findUnique({ where: { id } });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneByTitle(userId: string, title: string): Promise<List> {
    try {
      return this.prisma.list.findFirst({
        where: { userId, title },
      });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, data: Prisma.ListUpdateInput): Promise<List> {
    try {
      return this.prisma.list.update({ where: { id }, data });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<List> {
    try {
      return this.prisma.list.delete({ where: { id } });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }
}
