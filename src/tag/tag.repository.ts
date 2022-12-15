import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

import { Exception } from 'src/utils/exceptions/Exception';
import { ExceptionType } from 'src/utils/exceptions/exception.helper';

import { Tag } from './entities/tag.entity';

@Injectable()
export class TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.TagUncheckedCreateInput): Promise<Tag> {
    try {
      return this.prisma.tag.create({ data });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(userId: string): Promise<Tag[]> {
    try {
      return this.prisma.tag.findMany({ where: { userId } });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Tag> {
    try {
      return this.prisma.tag.findUnique({ where: { id } });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneByName(userId: string, name: string): Promise<Tag> {
    try {
      return this.prisma.tag.findFirst({
        where: { userId, name },
      });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, data: Prisma.TagUpdateInput): Promise<Tag> {
    try {
      return this.prisma.tag.update({ where: { id }, data });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<Tag> {
    try {
      return this.prisma.tag.delete({ where: { id } });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }
}
