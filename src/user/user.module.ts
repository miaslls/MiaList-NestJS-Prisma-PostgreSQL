import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { PrismaModule } from 'src/database/prisma.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
