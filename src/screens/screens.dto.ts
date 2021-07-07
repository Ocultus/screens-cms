import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { Screen } from './screen.entity';

export class CreateScreenDto extends PickType(Screen, ['title']) {}

export class UpdateScreenDto extends PartialType(CreateScreenDto) {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ type: String, format: 'uuid' })
  eventId?: string;
}

export class ResponseScreenDto extends PickType(Screen, [
  'id',
  'title',
  'userId',
  'eventId',
]) {}

export class ResponseScreensDto {
  @ApiProperty({ type: () => [ResponseScreenDto] })
  screens: ResponseScreenDto[];
}
