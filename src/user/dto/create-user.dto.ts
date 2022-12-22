import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: 'username', example: 'janedoe' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'password, min 8 char', example: 'jane1234' })
  @IsString()
  password: string;
}
