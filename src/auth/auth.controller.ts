import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { HandleException } from 'src/utils/exceptions/exception.helper';

import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

import { LoggedUser } from './logged-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'login' })
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    try {
      return await this.authService.login(dto);
    } catch (err) {
      HandleException(err);
    }
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'get logged user' })
  @ApiBearerAuth()
  getLoggedUser(@LoggedUser() user: User) {
    return user;
  }
}
