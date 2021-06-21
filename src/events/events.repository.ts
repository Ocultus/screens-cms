import { EntityRepository, Repository } from 'typeorm';
import { Event } from './event.entity';

@EntityRepository(EventRepository)
export class EventRepository extends Repository<Event> {}
