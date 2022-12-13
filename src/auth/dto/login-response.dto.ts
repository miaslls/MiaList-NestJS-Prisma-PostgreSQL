import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT token',
    example: 'AUTOMATICALLY_GENERATED_TOKEN',
  })
  token: string;

  @ApiProperty({
    description: 'authenticated user data',
  })
  user: User;
}
