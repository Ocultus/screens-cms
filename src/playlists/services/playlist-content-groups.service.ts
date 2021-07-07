import { InjectRepository } from '@nestjs/typeorm';
import { ResponseContentGroupsDto } from 'src/contentGroups/content-groups.dto';
import { PlaylistToContentGroupRepository } from 'src/playlist-to-content-groups/playlist-to-contents-groups.repository';
import { Playlist } from '../playlist.entity';

export class PlaylistContentGroupService {
  constructor(
    @InjectRepository(PlaylistToContentGroupRepository)
    private readonly playlistToContentRepository: PlaylistToContentGroupRepository,
  ) {}

  async getContents(
    playlistId: Playlist['id'],
  ): Promise<ResponseContentGroupsDto> {
    const playlistToContentGroups = await this.playlistToContentRepository.find(
      {
        join: {
          alias: 'playlist-to-content-groups',
          leftJoinAndSelect: {
            contentGroup: 'playlist-to-content-groups.contentGroup',
          },
        },
        where: { playlistId },
        order: { position: 'ASC' },
      },
    );
    const foundContentGroups = playlistToContentGroups.map(
      (obj) => obj.contentGroup,
    );
    return { contents: foundContentGroups };
  }
}
