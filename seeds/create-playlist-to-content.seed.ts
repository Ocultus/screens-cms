import { ContentRepository } from '../src/contents/contents.repository';
import { PlaylistToContent } from '../src/playlist-to-contents/playlist-to-content.entity';
import { PlaylistToContentRepository } from '../src/playlist-to-contents/playlist-to-contents.repository';
import { PlaylistRepository } from '../src/playlists/playlists.repository';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Content } from 'src/contents/content.entity';
import { Playlist } from 'src/playlists/playlist.entity';

const entityCount = 100;

export class CreatePlaylistToContent implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const playlists: Playlist[] = await connection
      .getCustomRepository(PlaylistRepository)
      .find({ take: entityCount });

    const contents: Content[] = await connection
      .getCustomRepository(ContentRepository)
      .find({ take: entityCount });

    const map: Map<string, number> = new Map();
    const playlistToContentMap: Map<number, number> = new Map();

    const playlistToContents = await factory(PlaylistToContent)()
      .map(async (playlistToContent) => {
        let randomPlaylistIndex = Math.floor(Math.random() * entityCount);
        let randomContentIndex = Math.floor(Math.random() * entityCount);

        while (
          playlistToContentMap.get(randomPlaylistIndex) === randomContentIndex
        ) {
          randomPlaylistIndex = Math.floor(Math.random() * entityCount);
          randomContentIndex = Math.floor(Math.random() * entityCount);
        }

        playlistToContentMap.set(randomPlaylistIndex, randomContentIndex);

        const playlistId = playlists[randomPlaylistIndex].id;

        playlistToContent.contentId = contents[randomContentIndex].id;
        playlistToContent.playlistId = playlistId;

        const oldPosition = map.get(playlistId);
        if (!oldPosition) {
          playlistToContent.position = 1;
          map.set(playlistId, 1);
        } else {
          playlistToContent.position = oldPosition + 1;
          map.set(playlistId, oldPosition + 1);
        }
        return playlistToContent;
      })
      .makeMany(entityCount);
    await connection
      .getCustomRepository(PlaylistToContentRepository)
      .save(playlistToContents);
  }
}
