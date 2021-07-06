import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import {
  Playlist,
  screenIdUniqueConstraint,
} from 'src/playlists/playlist.entity';
import {
  CreatePlaylistDto,
  ResponsePlaylistDto,
} from 'src/playlists/playlists.dto';
import { PlaylistRepository } from 'src/playlists/playlists.repository';

@Injectable()
export class ScreenPlaylistService extends TypeOrmCrudService<Playlist> {
  constructor(
    @InjectRepository(PlaylistRepository)
    readonly repository: PlaylistRepository,
  ) {
    super(repository);
  }

  async createOne(
    req: CrudRequest,
    dto: CreatePlaylistDto,
  ): Promise<ResponsePlaylistDto> {
    try {
      return await super.createOne(req, dto);
    } catch (error) {
      if (error && error.constraint === screenIdUniqueConstraint) {
        throw new BadRequestException('Duplicate screen id');
      }
      throw new BadRequestException();
    }
  }
}
