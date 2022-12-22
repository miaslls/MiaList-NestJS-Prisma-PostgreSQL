import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsString } from 'class-validator';

export class EntryDto {
  @ApiProperty({ description: 'entry text', example: 'buy groceries' })
  @IsString()
  text: string;

  @ApiProperty({ description: 'completed entry?' })
  completed?: boolean;

  @ApiProperty({ description: 'entry date', example: 'YYYY-MM-DD' })
  date?: Date;

  @ApiProperty({ description: 'entry amount', example: '9,99' })
  amount?: number;

  @ApiProperty({ description: 'entry url', example: 'http://entry.com' })
  hyperlink?: string;

  @ApiProperty({ description: 'list ID' })
  @IsMongoId()
  listId: string;
}
