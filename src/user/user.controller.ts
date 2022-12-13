import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async findAll(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (err) {
      HandleException(err);
    }
  }

  @Get(':username')
  @ApiOperation({ summary: 'get user' })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async findOne(@Param('username') username: string): Promise<User> {
    try {
      return await this.userService.findOne(username);
    } catch (err) {
      HandleException(err);
    }
  }

  @Patch(':username')
  @ApiOperation({ summary: 'update user' })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async update(@Param('username') username: string, @Body() dto: PartialUserDto): Promise<User> {
    try {
      return await this.userService.update(username, dto);
    } catch (err) {
      HandleException(err);
    }
  }

  @Delete(':username')
  @ApiOperation({ summary: 'remove user' })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async remove(@Param('username') username: string) {
    try {
      return await this.userService.remove(username);
    } catch (err) {
      HandleException(err);
    }
  }
}
