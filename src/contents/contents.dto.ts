import {
  ApiPropertyOptional,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { Content } from './content.entity';

export class CreateContentDto extends PickType(Content, ['category']) {}

export class UpdateContentDto extends PartialType(CreateContentDto) {
  @IsUUID()
  @ApiPropertyOptional({ type: String, format: 'uuid' })
  contentGroupId: string;
}

export class ResponseContentDto extends PickType(Content, [
  'id',
  'url',
  'key',
  'category',
  'contentGroupId',
]) {}
