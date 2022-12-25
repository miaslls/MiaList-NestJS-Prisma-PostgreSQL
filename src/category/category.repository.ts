import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

import { Exception } from 'src/utils/exceptions/Exception';
import { ExceptionType } from 'src/utils/exceptions/exception.helper';

import { Category } from './entities/category.entity';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly categSelect = {
    user: true,
    lists: {
      include: {
        tags: true,
        entries: true,
      },
    },
    _count: {
      select: {
        lists: true,
      },
    },
  };

  async create(data: Prisma.CategoryUncheckedCreateInput): Promise<Category> {
    try {
      return this.prisma.category.create({ data });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(userId: string): Promise<Category[]> {
    try {
      return this.prisma.category.findMany({
        where: { userId },
        include: this.categSelect,
        orderBy: { name: 'asc' },
      });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Category> {
    try {
      return this.prisma.category.findUnique({
        where: { id },
        include: this.categSelect,
      });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneByName(userId: string, name: string): Promise<Category> {
    try {
      return this.prisma.category.findFirst({
        where: { userId, name },
      });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category> {
    try {
      return this.prisma.category.update({ where: { id }, data });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<Category> {
    try {
      return this.prisma.category.delete({ where: { id } });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }
}
