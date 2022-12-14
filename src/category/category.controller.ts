import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CategoryService } from './category.service';
import { HandleException } from 'src/utils/exceptions/exception.helper';

import { Category } from './entities/category.entity';
import { CategoryDto } from './dto/create-category.dto';
import { CategoryUpdateDto } from './dto/update-category.dto';

import { User } from 'src/user/entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';

@ApiTags('categories')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'create category' })
  async create(@LoggedUser() loggedUser: User, @Body() dto: CategoryDto): Promise<Category> {
    try {
      return await this.categoryService.create(loggedUser.id, dto);
    } catch (err) {
      HandleException(err);
    }
  }

  @Get()
  @ApiOperation({ summary: 'get all categories (logged user)' })
  async findAll(@LoggedUser() loggedUser: User): Promise<Category[]> {
    try {
      return await this.categoryService.findAll(loggedUser.id);
    } catch (err) {
      HandleException(err);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'get category' })
  async findOne(@Param('id') id: string): Promise<Category> {
    try {
      return await this.categoryService.findOne(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update category' })
  async update(
    @LoggedUser() loggedUser: User,
    @Param('id') id: string,
    @Body() dto: CategoryUpdateDto,
  ): Promise<Category> {
    try {
      return await this.categoryService.update(loggedUser.id, id, dto);
    } catch (err) {
      HandleException(err);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'remove category' })
  async remove(@Param('id') id: string) {
    try {
      return await this.categoryService.remove(id);
    } catch (err) {
      HandleException(err);
    }
  }
}
