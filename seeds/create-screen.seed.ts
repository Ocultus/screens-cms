import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Screen } from '../src/screens/screen.entity';
import { EventRepository } from '../src/events/events.repository';
import { ScreenRepository } from '../src/screens/screens.repository';
import { UserRepository } from '../src/users/user.repository';

const entityCount = 100;

export class CreateScreen implements Seeder {
  async run(factory: Factory, connection: Connection) {
    const users = await connection
      .getCustomRepository(UserRepository)
      .find({ take: entityCount });

    const events = await connection
      .getCustomRepository(EventRepository)
      .find({ take: entityCount });

    const screens = await factory(Screen)()
      .map(async (screen) => {
        const randomArrIndex = Math.floor(Math.random() * entityCount);
        screen.userId = users[randomArrIndex].id;
        screen.eventId = events[randomArrIndex].id;
        return screen;
      })
      .makeMany(entityCount);

    await connection.getCustomRepository(ScreenRepository).save(screens);
  }
}
