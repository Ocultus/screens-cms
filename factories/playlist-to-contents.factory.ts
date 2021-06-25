import * as faker from 'faker';
import { define } from 'typeorm-seeding';
import { PlaylistToContent } from 'src/playlist-to-contents/playlist-to-content.entity';
define(PlaylistToContent, () => {
  const playlistToContent = new PlaylistToContent();
  playlistToContent.id = faker.datatype.uuid();
  playlistToContent.playTime = faker.datatype.number({ min: 1, max: 100 });
  return playlistToContent;
});
