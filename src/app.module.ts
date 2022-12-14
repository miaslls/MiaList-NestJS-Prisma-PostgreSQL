import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { ListModule } from './list/list.module';
import { EntryModule } from './entry/entry.module';

@Module({
  imports: [PrismaModule, AuthModule, HomeModule, UserModule, CategoryModule, TagModule, ListModule, EntryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
