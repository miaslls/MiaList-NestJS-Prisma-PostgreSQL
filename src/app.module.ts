import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { ListModule } from './list/list.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, CategoryModule, TagModule, ListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
