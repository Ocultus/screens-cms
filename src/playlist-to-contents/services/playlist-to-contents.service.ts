import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { PlaylistToContent } from '../playlist-to-content.entity';
import { PlaylistToContentRepository } from '../playlist-to-contents.repository';

@Injectable()
export class PlaylistToContentService extends TypeOrmCrudService<PlaylistToContent> {
  constructor(readonly repository: PlaylistToContentRepository) {
    super(repository);
  }
}
