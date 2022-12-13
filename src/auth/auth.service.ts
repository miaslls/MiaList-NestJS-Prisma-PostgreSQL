import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthRepository } from './auth.repository';

import { Exception } from 'src/utils/exceptions/Exception';
import { ExceptionType } from 'src/utils/exceptions/exception.helper';

import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository, private readonly jwt: JwtService) {}

  async login({ username, password }: LoginDto): Promise<LoginResponseDto> {
    const user = await this.authRepository.findUser(username);
    if (!user) throw new Exception(ExceptionType.DATA_INVALID, 'LOGIN INFO INVALID');

    const validHash = await bcrypt.compare(password, user.password);
    if (!validHash) throw new Exception(ExceptionType.DATA_INVALID, 'LOGIN INFO INVALID');

    delete user.password;

    return {
      token: this.jwt.sign({ username }),
      user,
    };
  }
}
