import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: 'username', example: 'janedoe' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'password, min 8 char', example: 'jane1234' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'password confirmation', example: 'jane1234' })
  @IsString()
  passwordConfirm: string;

  @ApiProperty({ description: 'admin?', default: false, type: 'boolean' })
  @IsBoolean()
  isAdmin: boolean;
}
