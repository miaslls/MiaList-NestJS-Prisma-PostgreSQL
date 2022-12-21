import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Get } from '@nestjs/common/decorators';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { HomeService } from './home.service';
import { HomeResponse } from './HomeResponse';

import { HandleException } from 'src/utils/exceptions/exception.helper';

import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('home')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @ApiOperation({ summary: 'get all lists by logged user' })
  async findAllLists(@LoggedUser() user: User): Promise<HomeResponse> {
    try {
      return await this.homeService.findAllLists(user.id);
    } catch (err) {
      HandleException(err);
    }
  }
}
