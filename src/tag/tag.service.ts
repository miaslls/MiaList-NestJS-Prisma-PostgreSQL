import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { TagRepository } from './tag.repository';

import { Exception } from 'src/utils/exceptions/Exception';
import { ExceptionType } from 'src/utils/exceptions/exception.helper';
import { validObjectId } from 'src/utils/validation/object-id';

import { Tag } from './entities/tag.entity';
import { TagDto } from './dto/create-tag.dto';
import { PartialTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  // 📌 CREATE

  async create(userId: string, dto: TagDto): Promise<Tag> {
    const duplicateName = await this.tagRepository.findOneByName(userId, dto.name);
    if (duplicateName) {
      throw new Exception(ExceptionType.DATA_INVALID, 'DUPLICATE TAG');
    }

    const data: Prisma.TagUncheckedCreateInput = { ...dto, userId };

    const tag = await this.tagRepository.create(data);
    delete tag.listIds;

    return tag;
  }

  // 📌 READ

  async findAll(userId: string): Promise<Tag[]> {
    const tags = await this.tagRepository.findAll(userId);
    tags.forEach((tag) => delete tag.listIds);

    return tags;
  }

  async findOne(id: string): Promise<Tag> {
    if (!validObjectId(id)) throw new Exception(ExceptionType.DATA_INVALID, 'ID INVALID');

    const tag = await this.tagRepository.findOne(id);
    if (!tag) {
      throw new Exception(ExceptionType.RESOURCE_NOT_FOUND, 'TAG NOT FOUND');
    }

    delete tag.listIds;
    return tag;
  }

  // 📌 UPDATE

  async update(userId: string, id: string, dto: PartialTagDto): Promise<Tag> {
    await this.findOne(id);

    const duplicateName = await this.tagRepository.findOneByName(userId, dto.name);
    if (duplicateName) {
      throw new Exception(ExceptionType.DATA_INVALID, 'DUPLICATE TAG');
    }

    const data: Prisma.TagUpdateInput = { ...dto };

    const tag = await this.tagRepository.update(id, data);
    delete tag.listIds;

    return tag;
  }

  // 📌 DELETE

  async remove(id: string): Promise<Tag> {
    await this.findOne(id);

    const tag = await this.tagRepository.remove(id);
    delete tag.listIds;

    return tag;
  }
}
