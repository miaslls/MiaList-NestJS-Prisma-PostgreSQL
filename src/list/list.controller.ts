import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { ListService } from './list.service';
import { HandleException } from 'src/utils/exceptions/exception.helper';

import { List } from './entities/list.entity';
import { ListDto } from './dto/create-list.dto';
import { PartialListDto } from './dto/update-list.dto';

import { User } from 'src/user/entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';

@ApiTags('lists')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  @ApiOperation({ summary: 'create list' })
  async create(@LoggedUser() loggedUser: User, @Body() dto: ListDto): Promise<List> {
    try {
      return await this.listService.create(loggedUser.id, dto);
    } catch (err) {
      HandleException(err);
    }
  }

  @Get()
  @ApiOperation({ summary: 'get all lists (logged user)' })
  async findAll(@LoggedUser() loggedUser: User): Promise<List[]> {
    try {
      return await this.listService.findAll(loggedUser.id);
    } catch (err) {
      HandleException(err);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'get list' })
  async findOne(@Param('id') id: string): Promise<List> {
    try {
      return await this.listService.findOne(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update list' })
  async update(@LoggedUser() loggedUser: User, @Param('id') id: string, @Body() dto: PartialListDto): Promise<List> {
    try {
      return await this.listService.update(loggedUser.id, id, dto);
    } catch (err) {
      HandleException(err);
    }
  }

  @Patch('pin/:id')
  @ApiOperation({ summary: 'toggle pin list' })
  async togglePinned(@Param('id') id: string): Promise<List> {
    try {
      return await this.listService.togglePinned(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'remove list' })
  async remove(@Param('id') id: string) {
    try {
      return await this.listService.remove(id);
    } catch (err) {
      HandleException(err);
    }
  }
}
