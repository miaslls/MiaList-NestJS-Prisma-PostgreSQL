import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { PrismaModule } from 'src/database/prisma.module';

import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';
import { EntryRepository } from './entry.repository';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [EntryController],
  providers: [EntryService, EntryRepository],
})
export class EntryModule {}
