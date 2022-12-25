import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

import { Exception } from 'src/utils/exceptions/Exception';
import { ExceptionType } from 'src/utils/exceptions/exception.helper';

import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly userSelect = {
    id: true,
    username: true,
    password: true,
    role: true,
    _count: {
      select: {
        categories: true,
        tags: true,
        lists: true,
      },
    },
  };

  async create(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return this.prisma.user.create({ data });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.prisma.user.findMany({
        select: this.userSelect,
        orderBy: { username: 'asc' },
      });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(username: string): Promise<User> {
    try {
      return this.prisma.user.findUnique({
        where: { username },
        select: this.userSelect,
      });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async update(username: string, data: Prisma.UserUpdateInput): Promise<User> {
    try {
      return this.prisma.user.update({ where: { username }, data });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(username: string): Promise<User> {
    try {
      return this.prisma.user.delete({ where: { username } });
    } catch {
      throw new Exception(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }
}
