import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest, Override } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ContentGroupRepository } from 'src/contentGroups/content-groups.repository';
import { ContentRepository } from 'src/contents/contents.repository';
import { PlaylistRepository } from 'src/playlists/playlists.repository';
import {
  PlaylistToContentGroup,
  positionUniqueConstraint,
} from '../playlist-to-content-group.entity';
import {
  CreatePlaylistToContentGroupDto,
  ResponsePlaylistToContentGroupDto,
  UpdatePlaylistToContentGroupDto,
} from '../playlist-to-content-groups.dto';
import { PlaylistToContentGroupRepository } from '../playlist-to-contents-groups.repository';

@Injectable()
export class PlaylistToContentGroupService extends TypeOrmCrudService<PlaylistToContentGroup> {
  constructor(
    readonly repository: PlaylistToContentGroupRepository,
    @InjectRepository(PlaylistRepository)
    private readonly playlistRepository: PlaylistRepository,
    @InjectRepository(ContentGroupRepository)
    private readonly contentGroupRepository: ContentGroupRepository,
  ) {
    super(repository);
  }

  @Override()
  async createOne(
    req: CrudRequest,
    dto: CreatePlaylistToContentGroupDto,
  ): Promise<ResponsePlaylistToContentGroupDto> {
    try {
      return await super.createOne(req, dto);
    } catch (error) {
      if (error && error.constraint === positionUniqueConstraint) {
        throw new BadRequestException(
          'Position/Playlist-Content pair incorrect',
        );
      }
    }
  }

  @Override()
  async updateOne(
    req: CrudRequest,
    dto: UpdatePlaylistToContentGroupDto,
  ): Promise<ResponsePlaylistToContentGroupDto> {
    if (dto.contentGroupId) {
      const contentGroup = this.contentGroupRepository.findOne(
        dto.contentGroupId,
      );
      if (!contentGroup) {
        throw new NotFoundException('Content group not found');
      }
    }
    if (dto.playlistId) {
      const playlist = this.playlistRepository.findOne(dto.playlistId);
      if (!playlist) {
        throw new NotFoundException('Playlist not found');
      }
    }
    try {
      return await super.updateOne(req, dto);
    } catch (error) {
      if (error && error.constraint === positionUniqueConstraint) {
        throw new BadRequestException(
          'Position/Playlist-Content pair incorrect',
        );
      }
    }
  }
}
