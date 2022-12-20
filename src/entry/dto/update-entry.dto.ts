import { PartialType } from '@nestjs/swagger';
import { EntryDto } from './create-entry.dto';

export class PartialEntryDto extends PartialType(EntryDto) {}
