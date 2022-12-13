import { PartialType } from '@nestjs/swagger';
import { UserDto } from './create-user.dto';

export class PartialUserDto extends PartialType(UserDto) {
  role?: string;
}
