import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistToContentRepository } from './playlist-to-contents.repository';
import { PlaylistToContentService } from './services/playlist-to-contents.service';

@Module({
  providers: [PlaylistToContentService],
  imports: [TypeOrmModule.forFeature([PlaylistToContentRepository])],
})
export class PlaylistToContentModule {}
