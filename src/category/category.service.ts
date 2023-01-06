import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CategoryRepository } from './category.repository';

import { Exception } from 'src/utils/exceptions/Exception';
import { ExceptionType } from 'src/utils/exceptions/exception.helper';

import { Category } from './entities/category.entity';
import { CategoryDto } from './dto/create-category.dto';
import { PartialCategoryDto } from './dto/update-category.dto';
import { CategoryResponse } from './CategoryResponse';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  // 📌 CREATE

  async create(userId: string, dto: CategoryDto): Promise<Category> {
    const duplicateName = await this.categoryRepository.findOneByName(userId, dto.name);
    if (duplicateName) {
      throw new Exception(ExceptionType.DATA_INVALID, 'DUPLICATE CATEGORY');
    }

    const data: Prisma.CategoryUncheckedCreateInput = { ...dto, userId };
    return await this.categoryRepository.create(data);
  }

  // 📌 READ

  async findAll(userId: string): Promise<CategoryResponse[]> {
    const categories = await this.categoryRepository.findAll(userId);
    return categories.map((category) => new CategoryResponse(category));
  }

  async findOne(id: string): Promise<CategoryResponse> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new Exception(ExceptionType.RESOURCE_NOT_FOUND, 'CATEGORY NOT FOUND');
    }

    return new CategoryResponse(category);
  }

  // 📌 UPDATE

  async update(userId: string, id: string, dto: PartialCategoryDto): Promise<Category> {
    await this.findOne(id);

    const duplicateName = await this.categoryRepository.findOneByName(userId, dto.name);
    if (duplicateName) {
      throw new Exception(ExceptionType.DATA_INVALID, 'DUPLICATE CATEGORY');
    }

    const data: Prisma.CategoryUpdateInput = { ...dto };
    return await this.categoryRepository.update(id, data);
  }

  // 📌 DELETE

  async remove(id: string): Promise<Category> {
    await this.findOne(id);
    return await this.categoryRepository.remove(id);
  }
}
