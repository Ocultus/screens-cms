import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistToContentRepository } from '../playlist-to-contents.repository';

@Injectable()
export class PlaylistToContentService {
  constructor(
    @InjectRepository(PlaylistToContentRepository)
    private readonly playlistToContentRepository: PlaylistToContentRepository,
  ) {}
}
