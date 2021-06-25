import { Playlist } from '../src/playlists/playlist.entity';
import { PlaylistRepository } from '../src/playlists/playlists.repository';
import { ScreenRepository } from '../src/screens/screens.repository';
import { UserRepository } from '../src/users/user.repository';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

const entityCount = 100;

export class CreatePlaylist implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const users = await connection
      .getCustomRepository(UserRepository)
      .find({ take: entityCount });

    const screens = await connection
      .getCustomRepository(ScreenRepository)
      .find({ take: entityCount });
    const playlists = await factory(Playlist)()
      .map(async (playlist) => {
        const randomUserIndex = Math.floor(Math.random() * entityCount);
        playlist.userId = users[randomUserIndex].id;
        const randomScreenIndex = Math.floor(Math.random() * entityCount);
        playlist.screenId = screens[randomScreenIndex].id;
        return playlist;
      })
      .makeMany(entityCount);

    await connection.getCustomRepository(PlaylistRepository).save(playlists);
  }
}
