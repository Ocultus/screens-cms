import { Content } from '../src/contents/content.entity';
import { ContentRepository } from '../src/contents/contents.repository';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

const entityCount = 100;

export class CreateContent implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const contents = await factory(Content)().makeMany(entityCount);
    await connection.getCustomRepository(ContentRepository).save(contents);
  }
}
