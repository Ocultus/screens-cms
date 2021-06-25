import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Event } from '../src/events/event.entity';
import { EventRepository } from '../src/events/events.repository';
import { UserRepository } from '../src/users/user.repository';

const entityCount = 100;

export class CreateEvent implements Seeder {
  async run(factory: Factory, connection: Connection) {
    const users = await connection
      .getCustomRepository(UserRepository)
      .find({ take: entityCount });

    const events = await factory(Event)()
      .map(async (event) => {
        const randomArrIndex = Math.floor(Math.random() * entityCount);
        event.userId = users[randomArrIndex].id;
        return event;
      })
      .makeMany(entityCount);

    await connection.getCustomRepository(EventRepository).save(events);
  }
}
