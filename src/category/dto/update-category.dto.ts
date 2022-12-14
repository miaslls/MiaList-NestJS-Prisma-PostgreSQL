import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CategoryUpdateDto {
  @ApiProperty({ description: 'category name', example: 'personal' })
  @IsString()
  name: string;
}
