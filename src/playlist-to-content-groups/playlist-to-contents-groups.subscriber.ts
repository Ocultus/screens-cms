import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { PlaylistToContentGroup } from './playlist-to-content-group.entity';

@EventSubscriber()
export class PlaylistToContentGroupSubscriber
  implements EntitySubscriberInterface<PlaylistToContentGroup>
{
  async beforeInsert(event: InsertEvent<PlaylistToContentGroup>) {
    if (!event.entity.position) {
      const playlistId = event.entity.playlistId;
      const repository = event.connection.getRepository(PlaylistToContentGroup);
      const playlistToContents = await repository.find({
        where: { playlistId },
        order: { position: 'DESC' },
      });
      event.entity.position =
        playlistToContents.length === 0
          ? 1
          : playlistToContents[0].position + 1;
    }
  }
}
