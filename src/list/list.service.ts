import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ListRepository } from './list.repository';

import { Exception } from 'src/utils/exceptions/Exception';
import { ExceptionType } from 'src/utils/exceptions/exception.helper';
import { validObjectId } from 'src/utils/validation/object-id';

import { List } from './entities/list.entity';
import { ListDto } from './dto/create-list.dto';
import { PartialListDto } from './dto/update-list.dto';

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  // 📌 CREATE

  async create(userId: string, dto: ListDto): Promise<List> {
    if ('categoryId' in dto) {
      if (!validObjectId(dto.categoryId)) {
        throw new Exception(ExceptionType.DATA_INVALID, 'CATEGORY ID INVALID');
      }
    }

    dto.tagIds.forEach((tagId) => {
      if (!validObjectId(tagId)) throw new Exception(ExceptionType.DATA_INVALID, 'TAG ID INVALID');
    });

    const duplicateName = await this.listRepository.findOneByTitle(userId, dto.title);
    if (duplicateName) {
      throw new Exception(ExceptionType.DATA_INVALID, 'DUPLICATE LIST');
    }

    const data: Prisma.ListUncheckedCreateInput = {
      ...dto,
      userId,
      createdAt: new Date(),
      tags: { connect: dto.tagIds.map((tagId) => ({ id: tagId })) },
    };

    return await this.listRepository.create(data);
  }

  // 📌 READ

  async findAll(userId: string): Promise<List[]> {
    return await this.listRepository.findAll(userId);
  }

  async findOne(id: string): Promise<List> {
    if (!validObjectId(id)) throw new Exception(ExceptionType.DATA_INVALID, 'ID INVALID');

    const list = await this.listRepository.findOne(id);
    if (!list) {
      throw new Exception(ExceptionType.RESOURCE_NOT_FOUND, 'LIST NOT FOUND');
    }

    return list;
  }

  // 📌 UPDATE

  async update(userId: string, id: string, dto: PartialListDto): Promise<List> {
    const list = await this.findOne(id);

    if ('categoryId' in dto) {
      if (!validObjectId(dto.categoryId)) {
        throw new Exception(ExceptionType.DATA_INVALID, 'CATEGORY ID INVALID');
      }
    }

    if ('tagIds' in dto) {
      dto.tagIds.forEach((tagId) => {
        if (!validObjectId(tagId)) throw new Exception(ExceptionType.DATA_INVALID, 'TAG ID INVALID');
      });
    }

    if ('title' in dto && dto.title !== list.title) {
      const duplicateTitle = await this.listRepository.findOneByTitle(userId, dto.title);
      if (duplicateTitle) {
        throw new Exception(ExceptionType.DATA_INVALID, 'DUPLICATE LIST');
      }
    }

    const data: Prisma.ListUpdateInput = { ...dto };

    if ('tagIds' in dto) {
      data.tags = { set: dto.tagIds.map((tagId) => ({ id: tagId })) };
    }

    return await this.listRepository.update(id, data);
  }

  async togglePinned(id: string): Promise<List> {
    const list = await this.findOne(id);
    const data = { pinned: list.pinned ? false : true };

    return await this.listRepository.update(id, data);
  }

  // 📌 DELETE

  async remove(id: string): Promise<List> {
    await this.findOne(id);
    return await this.listRepository.remove(id);
  }
}