import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { HandleException } from 'src/utils/exceptions/exception.helper';

import { User } from './entities/user.entity';
import { UserDto } from './dto/create-user.dto';
import { PartialUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'create user' })
  async create(@Body() dto: UserDto): Promise<User> {
    try {
      return await this.userService.create(dto);
    } catch (err) {
      HandleException(err);
    }
  }

  @Get()
  @ApiOperation({ summary: 'get all users' })
  async findAll(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (err) {
      HandleException(err);
    }
  }

  @Get(':username')
  @ApiOperation({ summary: 'get user' })
  async findOne(@Param('username') username: string): Promise<User> {
    try {
      return await this.userService.findOne(username);
    } catch (err) {
      HandleException(err);
    }
  }

  @Patch(':username')
  @ApiOperation({ summary: 'update user' })
  async update(@Param('username') username: string, @Body() dto: PartialUserDto): Promise<User> {
    try {
      return await this.userService.update(username, dto);
    } catch (err) {
      HandleException(err);
    }
  }

  @Delete(':username')
  @ApiOperation({ summary: 'remove user' })
  async remove(@Param('username') username: string) {
    try {
      return await this.userService.remove(username);
    } catch (err) {
      HandleException(err);
    }
  }
}
