import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/database/prisma.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
