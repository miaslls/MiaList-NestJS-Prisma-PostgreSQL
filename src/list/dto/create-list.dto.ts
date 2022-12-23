import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class ListDto {
  @ApiProperty({ description: 'list title', example: 'groceries' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'icon string identifier', example: 'egg-fried' })
  @IsString()
  icon: string;

  @ApiProperty({ description: 'pinned list?' })
  @IsBoolean()
  pinned: boolean;

  @ApiProperty({ description: 'checklist?' })
  @IsBoolean()
  isChecklist: boolean;

  @ApiProperty({ description: 'category ID' })
  categoryId?: string;

  @ApiProperty({ description: 'tag IDs' })
  tags?: string[];
}
