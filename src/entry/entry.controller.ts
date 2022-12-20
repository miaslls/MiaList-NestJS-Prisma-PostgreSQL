import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { EntryService } from './entry.service';
import { HandleException } from 'src/utils/exceptions/exception.helper';

import { Entry } from './entities/entry.entity';
import { EntryDto } from './dto/create-entry.dto';
import { PartialEntryDto } from './dto/update-entry.dto';

@ApiTags('entries')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post()
  @ApiOperation({ summary: 'create entry' })
  async create(@Body() dto: EntryDto): Promise<Entry> {
    try {
      return await this.entryService.create(dto);
    } catch (err) {
      HandleException(err);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'get entry' })
  async findOne(@Param('id') id: string): Promise<Entry> {
    try {
      return await this.entryService.findOne(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update entry' })
  async update(@Param('id') id: string, @Body() dto: PartialEntryDto): Promise<Entry> {
    try {
      return await this.entryService.update(id, dto);
    } catch (err) {
      HandleException(err);
    }
  }

  @Patch('star/:id')
  @ApiOperation({ summary: 'toggle star entry' })
  async toggleStarred(@Param('id') id: string): Promise<Entry> {
    try {
      return await this.entryService.toggleStarred(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @Patch('complete/:id')
  @ApiOperation({ summary: 'toggle complete entry' })
  async toggleCompleted(@Param('id') id: string): Promise<Entry> {
    try {
      return await this.entryService.toggleCompleted(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'remove entry' })
  async remove(@Param('id') id: string) {
    try {
      return await this.entryService.remove(id);
    } catch (err) {
      HandleException(err);
    }
  }
}
