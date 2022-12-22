import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class EntryDto {
  @ApiProperty({ description: 'entry text', example: 'buy groceries' })
  @IsString()
  text: string;

  @ApiProperty({ description: 'completed entry?', default: false })
  completed?: boolean;

  @ApiProperty({ description: 'entry date', example: '2022-12-22T00:00:00.000Z' })
  date?: Date;

  @ApiProperty({ description: 'entry amount', example: '9.99' })
  amount?: number;

  @ApiProperty({ description: 'entry url', example: 'http://entry.com' })
  hyperlink?: string;

  @ApiProperty({ description: 'list ID' })
  @IsMongoId()
  listId: string;
}
