import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentModule } from 'src/contents/contents.module';
import { PlaylistModule } from 'src/playlists/playlists.module';
import { PlaylistToContentController } from './playlist-to-contents.controller';
import { PlaylistToContentRepository } from './playlist-to-contents.repository';
import { PlaylistToContentService } from './services/playlist-to-contents.service';

@Module({
  providers: [PlaylistToContentService],
  imports: [
    TypeOrmModule.forFeature([PlaylistToContentRepository]),
    ContentModule,
    PlaylistModule,
  ],
  controllers: [PlaylistToContentController],
})
export class PlaylistToContentModule {}
