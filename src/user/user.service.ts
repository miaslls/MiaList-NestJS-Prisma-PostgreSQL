import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from './user.repository';

import { Exception } from 'src/utils/exceptions/Exception';
import { ExceptionType } from 'src/utils/exceptions/exception.helper';

import { User } from './entities/user.entity';
import { UserDto } from './dto/create-user.dto';
import { PartialUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // 📌 CREATE

  async create(dto: UserDto): Promise<User> {
    const duplicateUsername = await this.userRepository.findOne(dto.username);
    if (duplicateUsername) throw new Exception(ExceptionType.DATA_INVALID, 'DUPLICATE USERNAME');

    if (dto.password.length < 8) throw new Exception(ExceptionType.DATA_INVALID, 'PASSWORD TOO SHORT');
    if (dto.password !== dto.passwordConfirm) throw new Exception(ExceptionType.DATA_INVALID, "PASSWORDS DON'T MATCH");

    const data = { ...dto };

    delete data.passwordConfirm;
    data.password = await bcrypt.hash(dto.password, 10);

    const user = await this.userRepository.create(data);

    delete user.password;
    return user;
  }

  // 📌 READ

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    users.forEach((user) => delete user.password);
    return users;
  }

  async findOne(username: string): Promise<User> {
    const user = await this.userRepository.findOne(username);
    if (!user) throw new Exception(ExceptionType.RESOURCE_NOT_FOUND, 'USER NOT FOUND');

    delete user.password;
    return user;
  }

  // 📌 UPDATE

  async update(username: string, dto: PartialUserDto): Promise<User> {
    const userInDb = await this.userRepository.findOne(username);
    if (!userInDb) throw new Exception(ExceptionType.RESOURCE_NOT_FOUND, 'USER NOT FOUND');

    if ('username' in dto && dto.username !== username) {
      const duplicateUsername = await this.userRepository.findOne(dto.username);
      if (duplicateUsername) throw new Exception(ExceptionType.DATA_INVALID, 'DUPLICATE USERNAME');
    }

    const data = { ...dto };

    if ('password' in data) {
      if (data.password.length < 8) {
        throw new Exception(ExceptionType.DATA_INVALID, 'PASSWORD TOO SHORT');
      }

      if (dto.password !== dto.passwordConfirm) {
        throw new Exception(ExceptionType.DATA_INVALID, "PASSWORDS DON'T MATCH");
      }

      data.password = await bcrypt.hash(data.password, 10);
      delete data.passwordConfirm;
    }

    const user = await this.userRepository.update(username, data);

    delete user.password;
    return user;
  }

  // 📌 DELETE

  async remove(username: string): Promise<User> {
    await this.findOne(username);

    const user = await this.userRepository.remove(username);

    delete user.password;
    return user;
  }
}
