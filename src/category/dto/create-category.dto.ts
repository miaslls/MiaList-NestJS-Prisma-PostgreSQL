import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CategoryDto {
  @ApiProperty({ description: 'category name', example: 'work' })
  @IsString()
  name: string;
}
