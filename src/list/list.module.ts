import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { PrismaModule } from 'src/database/prisma.module';

import { ListController } from './list.controller';
import { ListService } from './list.service';
import { ListRepository } from './list.repository';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ListController],
  providers: [ListService, ListRepository],
})
export class ListModule {}
