import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { screenIdUniqueConstraint } from 'src/playlists/playlist.entity';
import {
  CreatePlaylistDto,
  ResponsePlaylistDto,
} from 'src/playlists/playlists.dto';
import { PlaylistRepository } from 'src/playlists/playlists.repository';
import { User } from 'src/users/user.entity';
import { Screen } from '../screen.entity';

@Injectable()
export class ScreenPlaylistService {
  constructor(
    @InjectRepository(PlaylistRepository)
    private readonly playlistRepository: PlaylistRepository,
  ) {}

  async getPlaylist(screenId: Screen['id']): Promise<ResponsePlaylistDto> {
    return this.playlistRepository.findOne({ where: { screenId } });
  }
  async createPlaylist(
    userId: User['id'],
    createPlaylistDto: CreatePlaylistDto,
    screenId: Screen['id'],
  ): Promise<ResponsePlaylistDto> {
    try {
      return await this.playlistRepository.save({
        ...createPlaylistDto,
        screenId,
        userId,
      });
    } catch (error) {
      if (error && error.constraint === screenIdUniqueConstraint) {
        throw new BadRequestException();
      }
      throw new BadRequestException();
    }
  }
}
