import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { EventRepository } from '../events.repository';
import { Event } from '../event.entity';

@Injectable()
export class EventService extends TypeOrmCrudService<Event> {
  constructor(readonly repository: EventRepository) {
    super(repository);
  }
}
