import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { CreateScreenDto } from 'src/screens/screens.dto';
import { EventService } from './services/events.service';

@Injectable()
export class EventExistsPipe implements PipeTransform {
  constructor(private eventService: EventService) {}

  async transform(value: CreateScreenDto, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const pillar = await this.eventService.findOne(value.eventId);
      if (!pillar) {
        throw new NotFoundException('Event don`t exists');
      }
    }
    return value;
  }
}
