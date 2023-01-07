import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { TagService } from './tag.service';
import { HandleException } from 'src/utils/exceptions/exception.helper';

import { Tag } from './entities/tag.entity';
import { TagDto } from './dto/create-tag.dto';
import { PartialTagDto } from './dto/update-tag.dto';
import { TagResponse } from './tagResponse';

import { User } from 'src/user/entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';

@ApiTags('tags')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiOperation({ summary: 'create tag' })
  async create(@LoggedUser() loggedUser: User, @Body() dto: TagDto): Promise<Tag> {
    try {
      return await this.tagService.create(loggedUser.id, dto);
    } catch (err) {
      HandleException(err);
    }
  }

  @Get()
  @ApiOperation({ summary: 'get all tags (logged user)' })
  async findAll(@LoggedUser() loggedUser: User): Promise<TagResponse[]> {
    try {
      return await this.tagService.findAll(loggedUser.id);
    } catch (err) {
      HandleException(err);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'get tag' })
  async findOne(@Param('id') id: string): Promise<TagResponse> {
    try {
      return await this.tagService.findOne(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update tag' })
  async update(@LoggedUser() loggedUser: User, @Param('id') id: string, @Body() dto: PartialTagDto): Promise<Tag> {
    try {
      return await this.tagService.update(loggedUser.id, id, dto);
    } catch (err) {
      HandleException(err);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'remove tag' })
  async remove(@Param('id') id: string) {
    try {
      return await this.tagService.remove(id);
    } catch (err) {
      HandleException(err);
    }
  }
}
