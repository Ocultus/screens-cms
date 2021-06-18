import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(EventRepository)
export class EventRepository extends Repository<Event> {}
