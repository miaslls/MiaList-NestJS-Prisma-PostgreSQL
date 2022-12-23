import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { EntryRepository } from './entry.repository';

import { Exception } from 'src/utils/exceptions/Exception';
import { ExceptionType } from 'src/utils/exceptions/exception.helper';

import { EntryDto } from './dto/create-entry.dto';
import { PartialEntryDto } from './dto/update-entry.dto';
import { Entry } from './entities/entry.entity';

@Injectable()
export class EntryService {
  constructor(private readonly entryRepository: EntryRepository) {}

  // 📌 CREATE

  async create(dto: EntryDto): Promise<Entry> {
    const duplicateEntry = await this.entryRepository.findOneByText(dto.listId, dto.text);
    if (duplicateEntry) {
      throw new Exception(ExceptionType.DATA_INVALID, 'DUPLICATE ENTRY');
    }

    const data: Prisma.EntryUncheckedCreateInput = { ...dto, createdAt: new Date() };
    return await this.entryRepository.create(data);
  }

  // 📌 READ

  async findOne(id: string): Promise<Entry> {
    const entry = await this.entryRepository.findOne(id);
    if (!entry) {
      throw new Exception(ExceptionType.RESOURCE_NOT_FOUND, 'ENTRY NOT FOUND');
    }

    return entry;
  }

  // 📌 UPDATE

  async update(id: string, dto: PartialEntryDto): Promise<Entry> {
    const entry = await this.findOne(id);

    if (dto.text !== entry.text) {
      const duplicateEntry = await this.entryRepository.findOneByText(entry.listId, dto.text);
      if (duplicateEntry) {
        throw new Exception(ExceptionType.DATA_INVALID, 'DUPLICATE ENTRY');
      }
    }

    const data: Prisma.EntryUpdateInput = { ...dto };
    return await this.entryRepository.update(id, data);
  }

  async toggleStarred(id: string): Promise<Entry> {
    const entry = await this.findOne(id);
    const data = { starred: entry.starred ? false : true };

    return await this.entryRepository.update(id, data);
  }

  async toggleCompleted(id: string): Promise<Entry> {
    const entry = await this.findOne(id);
    const data = { completed: entry.completed ? false : true };

    return await this.entryRepository.update(id, data);
  }

  // 📌 DELETE

  async remove(id: string): Promise<Entry> {
    await this.findOne(id);
    return await this.entryRepository.remove(id);
  }
}
