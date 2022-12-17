import { PartialType } from '@nestjs/swagger';
import { TagDto } from './create-tag.dto';

export class PartialTagDto extends PartialType(TagDto) {}
