import { PartialType } from '@nestjs/swagger';
import { CategoryDto } from './create-category.dto';

export class PartialCategoryDto extends PartialType(CategoryDto) {}
