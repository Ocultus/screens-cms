import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest, Override } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ContentGroup } from 'src/contentGroups/content-group.entity';
import { ContentGroupRepository } from 'src/contentGroups/content-groups.repository';
import { PlaylistToContentGroupRepository } from 'src/playlist-to-content-groups/playlist-to-contents-groups.repository';

@Injectable()
export class PlaylistContentGroupService extends TypeOrmCrudService<ContentGroup> {
  constructor(
    readonly repository: ContentGroupRepository,
    @InjectRepository(PlaylistToContentGroupRepository)
    readonly playlistToContentGroupRepository: PlaylistToContentGroupRepository,
  ) {
    super(repository);
  }

  @Override()
  async getMany(req: CrudRequest) {
    const playlistId = req.options.params.playlistId;
    const playlistToContentGroups =
      await this.playlistToContentGroupRepository.find({
        join: {
          alias: 'playlist-to-contents',
          leftJoinAndSelect: {
            content: 'playlist-to-contents.content',
          },
        },
        where: { playlistId },
        order: { position: 'ASC' },
      });
    const foundContentGroups = playlistToContentGroups.map(
      (obj) => obj.contentGroup,
    );
    return foundContentGroups;
  }
}
