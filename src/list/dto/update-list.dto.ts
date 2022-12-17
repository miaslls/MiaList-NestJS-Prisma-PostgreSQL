import { PartialType } from '@nestjs/swagger';
import { ListDto } from './create-list.dto';

export class PartialListDto extends PartialType(ListDto) {}
