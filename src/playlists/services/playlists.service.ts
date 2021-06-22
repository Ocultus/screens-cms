import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Playlist } from '../playlist.entity';
import { PlaylistRepository } from '../playlists.repository';

@Injectable()
export class PlaylistService extends TypeOrmCrudService<Playlist> {
  constructor(readonly repository: PlaylistRepository) {
    super(repository);
  }
}
