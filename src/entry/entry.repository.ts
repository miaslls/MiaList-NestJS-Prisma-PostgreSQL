import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

import { Exception } from 'src/utils/exceptions/Exception';
import { ExceptionType } from 'src/utils/exceptions/exception.helper';

import { Entry } from './entities/entry.entity';

@Injectable()
export class EntryRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly entrySelect = {
    list: {
      include: {
        user: true,
      },
    },
  };

  async create(data: Prisma.EntryUncheckedCreateInput): Promise<Entry> {
    try {
      return this.prisma.entry.create({ data });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Entry> {
    try {
      return this.prisma.entry.findUnique({
        where: { id },
        include: this.entrySelect,
      });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneByText(listId: string, text: string): Promise<Entry> {
    try {
      return this.prisma.entry.findFirst({
        where: { listId, text },
      });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, data: Prisma.EntryUpdateInput): Promise<Entry> {
    try {
      return this.prisma.entry.update({ where: { id }, data });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<Entry> {
    try {
      return this.prisma.entry.delete({ where: { id } });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }
}
