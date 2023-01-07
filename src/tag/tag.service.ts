import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { TagRepository } from './tag.repository';

import { Exception } from 'src/utils/exceptions/Exception';
import { ExceptionType } from 'src/utils/exceptions/exception.helper';

import { Tag } from './entities/tag.entity';
import { TagDto } from './dto/create-tag.dto';
import { PartialTagDto } from './dto/update-tag.dto';
import { TagResponse } from './tagResponse';

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
    return await this.tagRepository.create(data);
  }

  // 📌 READ

  async findAll(userId: string): Promise<TagResponse[]> {
    const tags = await this.tagRepository.findAll(userId);

    return tags.map((tag) => new TagResponse(tag));
  }

  async findOne(id: string): Promise<TagResponse> {
    const tag = await this.tagRepository.findOne(id);
    if (!tag) {
      throw new Exception(ExceptionType.RESOURCE_NOT_FOUND, 'TAG NOT FOUND');
    }

    return new TagResponse(tag);
  }

  // 📌 UPDATE

  async update(userId: string, id: string, dto: PartialTagDto): Promise<Tag> {
    await this.findOne(id);

    const duplicateName = await this.tagRepository.findOneByName(userId, dto.name);
    if (duplicateName) {
      throw new Exception(ExceptionType.DATA_INVALID, 'DUPLICATE TAG');
    }

    const data: Prisma.TagUpdateInput = { ...dto };
    return await this.tagRepository.update(id, data);
  }

  // 📌 DELETE

  async remove(id: string): Promise<Tag> {
    await this.findOne(id);
    return await this.tagRepository.remove(id);
  }
}
