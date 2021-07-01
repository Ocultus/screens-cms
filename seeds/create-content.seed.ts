import { ContentGroup } from 'src/contentGroups/content-group.entity';
import { ContentGroupRepository } from 'src/contentGroups/content-groups.repository';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

const entityCount = 100;

export class CreateContent implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const contents = await factory(ContentGroup)().makeMany(entityCount);
    await connection.getCustomRepository(ContentGroupRepository).save(contents);
  }
}
