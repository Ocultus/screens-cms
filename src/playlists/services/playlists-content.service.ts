import { InjectRepository } from '@nestjs/typeorm';
import { ResponseContentsDto } from 'src/contents/contents.dto';
import { PlaylistToContentRepository } from 'src/playlist-to-contents/playlist-to-contents.repository';
import { Playlist } from '../playlist.entity';

export class PlaylistContentService {
  constructor(
    @InjectRepository(PlaylistToContentRepository)
    private readonly playlistToContentRepository: PlaylistToContentRepository,
  ) {}

  async getContents(playlistId: Playlist['id']): Promise<ResponseContentsDto> {
    const playlistToContents = await this.playlistToContentRepository.find({
      join: {
        alias: 'playlist-to-contents',
        leftJoinAndSelect: {
          content: 'playlist-to-contents.content',
        },
      },
      where: { playlistId },
      order: { position: 'ASC' },
    });
    const foundContents = playlistToContents.map((obj) => obj.content);
    return { contents: foundContents };
  }
}
