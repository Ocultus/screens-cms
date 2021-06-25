import * as faker from 'faker';
import { define } from 'typeorm-seeding';
import { Event } from 'src/events/event.entity';

define(Event, () => {
  const event = new Event();
  event.id = faker.datatype.uuid();
  event.name = faker.name.title();

  return event;
});
