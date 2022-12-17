import { Injectable } from '@nestjs/common';

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

    const data = { ...dto, userId };
    return await this.tagRepository.create(data);
  }

  // 📌 READ

  async findAll(userId: string): Promise<Tag[]> {
    return await this.tagRepository.findAll(userId);
  }

  async findOne(id: string): Promise<Tag> {
    if (!validObjectId(id)) throw new Exception(ExceptionType.DATA_INVALID, 'ID INVALID');

    const tag = await this.tagRepository.findOne(id);
    if (!tag) {
      throw new Exception(ExceptionType.RESOURCE_NOT_FOUND, 'TAG NOT FOUND');
    }

    return tag;
  }

  // 📌 UPDATE

  async update(userId: string, id: string, dto: PartialTagDto): Promise<Tag> {
    await this.findOne(id);

    const duplicateName = await this.tagRepository.findOneByName(userId, dto.name);
    if (duplicateName) {
      throw new Exception(ExceptionType.DATA_INVALID, 'DUPLICATE TAG');
    }

    const data = { ...dto };

    return await this.tagRepository.update(id, data);
  }

  // 📌 DELETE

  async remove(id: string): Promise<Tag> {
    await this.findOne(id);
    return await this.tagRepository.remove(id);
  }
}
