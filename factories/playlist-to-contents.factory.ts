import * as faker from 'faker';
import { PlaylistToContentGroup } from 'src/playlist-to-content-groups/playlist-to-content-group.entity';
import { define } from 'typeorm-seeding';
define(PlaylistToContentGroup, () => {
  const playlistToContent = new PlaylistToContentGroup();
  playlistToContent.id = faker.datatype.uuid();
  playlistToContent.playTime = faker.datatype.number({ min: 1, max: 100 });
  return playlistToContent;
});
