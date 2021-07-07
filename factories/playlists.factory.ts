import * as faker from 'faker';
import { Playlist } from 'src/playlists/playlist.entity';
import { define } from 'typeorm-seeding';

define(Playlist, () => {
  const playlist = new Playlist();
  playlist.id = faker.datatype.uuid();
  playlist.name = faker.music.genre();

  return playlist;
});
