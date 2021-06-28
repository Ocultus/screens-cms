import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CrudRequest, Override } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { PlaylistToContent } from '../playlist-to-content.entity';
import {
  CreatePlaylistToContentDto,
  ResponsePlaylistToContentDto,
  UpdatePlaylistToContentDto,
} from '../playlist-to-contents.dto';
import { PlaylistToContentRepository } from '../playlist-to-contents.repository';

const PG_UNIQUE_CONSTRAINT_VIOLATION = '23505';

@Injectable()
export class PlaylistToContentService extends TypeOrmCrudService<PlaylistToContent> {
  constructor(readonly repository: PlaylistToContentRepository) {
    super(repository);
  }

  @Override()
  async createOne(
    req: CrudRequest,
    dto: CreatePlaylistToContentDto,
  ): Promise<ResponsePlaylistToContentDto> {
    try {
      return await super.createOne(req, dto);
    } catch (error) {
      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new BadRequestException(
          'Position/Playlist-Content pair incorrect',
        );
      } else {
        throw new InternalServerErrorException('');
      }
    }
  }

  @Override()
  async updateOne(
    req: CrudRequest,
    dto: UpdatePlaylistToContentDto,
  ): Promise<ResponsePlaylistToContentDto> {
    try {
      return await super.updateOne(req, dto);
    } catch (error) {
      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new BadRequestException(
          'Position/Playlist-Content pair incorrect',
        );
      } else {
        throw new InternalServerErrorException('');
      }
    }
  }
}
