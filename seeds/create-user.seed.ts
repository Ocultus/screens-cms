import { User } from '../src/users/user.entity';
import { UserRepository } from '../src/users/user.repository';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

const entityCount = 100;

export class CreateUser implements Seeder {
  async run(factory: Factory, connection: Connection) {
    const users = await factory(User)().makeMany(entityCount);
    await connection.getCustomRepository(UserRepository).save(users);
  }
}
