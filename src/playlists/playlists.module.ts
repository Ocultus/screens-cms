import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistToContentRepository } from 'src/playlist-to-contents/playlist-to-contents.repository';
import { ScreenModule } from 'src/screens/screens.module';
import { PlaylistContentController } from './controllers/playlist-contents.controller';
import { PlaylistController } from './controllers/playlists.controller';
import { PlaylistRepository } from './playlists.repository';
import { PlaylistContentService } from './services/playlist-contents.service';
import { PlaylistService } from './services/playlists.service';

@Module({
  providers: [PlaylistService, PlaylistContentService],
  imports: [
    TypeOrmModule.forFeature([PlaylistRepository, PlaylistToContentRepository]),
    ScreenModule,
  ],
  controllers: [PlaylistController, PlaylistContentController],
  exports: [PlaylistService],
})
export class PlaylistModule {}
