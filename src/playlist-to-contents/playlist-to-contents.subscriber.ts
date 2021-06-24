import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { PlaylistToContent } from './playlist-to-content.entity';

@EventSubscriber()
export class PlaylistToContentSubscriber
  implements EntitySubscriberInterface<PlaylistToContent>
{
  async beforeInsert(event: InsertEvent<PlaylistToContent>) {
    if (!event.entity.position) {
      const playlistId = event.entity.playlistId;
      const repository = event.connection.getRepository(PlaylistToContent);
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
