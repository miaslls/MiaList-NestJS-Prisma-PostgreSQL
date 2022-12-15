import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TagUpdateDto {
  @ApiProperty({ description: 'tag name', example: 'shopping' })
  @IsString()
  name: string;
}
