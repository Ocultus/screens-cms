import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Event } from './event.entity';

export class CreateEventDto extends PickType(Event, ['name']) {}

export class UpdateEventDto extends PartialType(CreateEventDto) {}

export class ResponseEventDto extends PickType(Event, [
  'id',
  'name',
  'userId',
]) {}

export class ResponseEventsDto {
  @ApiProperty({ type: () => [ResponseEventDto] })
  events: ResponseEventDto[];
}
