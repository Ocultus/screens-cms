import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Playlist } from 'src/playlists/playlist.entity';
import { PlaylistRepository } from 'src/playlists/playlists.repository';
import { ContentGroup } from 'src/contentGroups/content-group.entity';
import { ContentGroupRepository } from 'src/contentGroups/content-groups.repository';
import { PlaylistToContentGroup } from 'src/playlist-to-content-groups/playlist-to-content-group.entity';
import { PlaylistToContentGroupRepository } from 'src/playlist-to-content-groups/playlist-to-contents-groups.repository';

const entityCount = 100;

export class CreatePlaylistToContentGroup implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const playlists: Playlist[] = await connection
      .getCustomRepository(PlaylistRepository)
      .find({ take: entityCount });

    const contentGroups = await connection
      .getCustomRepository(ContentGroupRepository)
      .find({ take: entityCount });

    const map: Map<string, number> = new Map();
    const playlistToContentMap: Map<number, number> = new Map();

    const playlistToContents = await factory(PlaylistToContentGroup)()
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

        playlistToContent.contentGroupId = contentGroups[randomContentIndex].id;
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
      .getCustomRepository(PlaylistToContentGroupRepository)
      .save(playlistToContents);
  }
}
