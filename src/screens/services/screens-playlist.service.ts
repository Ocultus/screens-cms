import { Injectable } from '@nestjs/common';
import {
  CreatePlaylistDto,
  ResponsePlaylistDto,
} from 'src/playlists/playlists.dto';
import { PlaylistRepository } from 'src/playlists/playlists.repository';
import { User } from 'src/users/user.entity';
import { Screen } from '../screen.entity';

@Injectable()
export class ScreenPlaylistService {
  constructor(private readonly playlistRepository: PlaylistRepository) {}

  async getPlaylist(screenId: Screen['id']): Promise<ResponsePlaylistDto> {
    return this.playlistRepository.findOne({ where: { screenId } });
  }
  async createPlaylist(
    userId: User['id'],
    createPlaylistDto: CreatePlaylistDto,
    screenId: Screen['id'],
  ): Promise<ResponsePlaylistDto> {
    return this.playlistRepository.save({
      ...createPlaylistDto,
      screenId,
      userId,
    });
  }
}
