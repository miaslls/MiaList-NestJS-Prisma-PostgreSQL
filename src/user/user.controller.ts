import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { HandleException } from 'src/utils/exceptions/exception.helper';

import { User } from './entities/user.entity';
import { UserDto } from './dto/create-user.dto';
import { PartialUserDto } from './dto/update-user.dto';
import { LoggedUser } from 'src/auth/logged-user.decorator';

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
  async findAll(@LoggedUser() loggedUser: User): Promise<User[]> {
    try {
      return await this.userService.findAll(loggedUser.role);
    } catch (err) {
      HandleException(err);
    }
  }

  @Get(':username')
  @ApiOperation({ summary: 'get user' })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async findOne(@LoggedUser() loggedUser: User, @Param('username') username: string): Promise<User> {
    try {
      return await this.userService.findOne(loggedUser, username);
    } catch (err) {
      HandleException(err);
    }
  }

  @Patch(':username')
  @ApiOperation({ summary: 'update user' })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async update(
    @LoggedUser() loggedUser: User,
    @Param('username') username: string,
    @Body() dto: PartialUserDto,
  ): Promise<User> {
    try {
      return await this.userService.update(loggedUser, username, dto);
    } catch (err) {
      HandleException(err);
    }
  }

  @Delete(':username')
  @ApiOperation({ summary: 'remove user' })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async remove(@LoggedUser() loggedUser: User, @Param('username') username: string) {
    try {
      return await this.userService.remove(loggedUser, username);
    } catch (err) {
      HandleException(err);
    }
  }
}
