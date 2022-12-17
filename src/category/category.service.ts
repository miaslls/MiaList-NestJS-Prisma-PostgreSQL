import { Injectable } from '@nestjs/common';

import { CategoryRepository } from './category.repository';

import { Exception } from 'src/utils/exceptions/Exception';
import { ExceptionType } from 'src/utils/exceptions/exception.helper';
import { validObjectId } from 'src/utils/validation/object-id';

import { Category } from './entities/category.entity';
import { CategoryDto } from './dto/create-category.dto';
import { PartialCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  // 📌 CREATE

  async create(userId: string, dto: CategoryDto): Promise<Category> {
    const duplicateName = await this.categoryRepository.findOneByName(userId, dto.name);
    if (duplicateName) {
      throw new Exception(ExceptionType.DATA_INVALID, 'DUPLICATE CATEGORY');
    }

    const data = { ...dto, userId };
    return await this.categoryRepository.create(data);
  }

  // 📌 READ

  async findAll(userId: string): Promise<Category[]> {
    return await this.categoryRepository.findAll(userId);
  }

  async findOne(id: string): Promise<Category> {
    if (!validObjectId(id)) throw new Exception(ExceptionType.DATA_INVALID, 'ID INVALID');

    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new Exception(ExceptionType.RESOURCE_NOT_FOUND, 'CATEGORY NOT FOUND');
    }

    return category;
  }

  // 📌 UPDATE

  async update(userId: string, id: string, dto: PartialCategoryDto): Promise<Category> {
    if (!validObjectId(id)) throw new Exception(ExceptionType.DATA_INVALID, 'ID INVALID');

    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new Exception(ExceptionType.RESOURCE_NOT_FOUND, 'CATEGORY NOT FOUND');
    }

    const duplicateName = await this.categoryRepository.findOneByName(userId, dto.name);
    if (duplicateName) {
      throw new Exception(ExceptionType.DATA_INVALID, 'DUPLICATE CATEGORY');
    }

    const data = { ...dto };

    return await this.categoryRepository.update(id, data);
  }

  // 📌 DELETE

  async remove(id: string): Promise<Category> {
    if (!validObjectId(id)) throw new Exception(ExceptionType.DATA_INVALID, 'ID INVALID');

    await this.findOne(id);
    return await this.categoryRepository.remove(id);
  }
}
