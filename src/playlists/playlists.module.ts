import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentGroupRepository } from 'src/contentGroups/content-groups.repository';
import { PlaylistToContentGroupRepository } from 'src/playlist-to-content-groups/playlist-to-contents-groups.repository';
import { ScreenModule } from 'src/screens/screens.module';
import { ScreenRepository } from 'src/screens/screens.repository';
import { PlaylistContentGroupController } from './controllers/playlists-content-groups.controller';
import { PlaylistController } from './controllers/playlists.controller';
import { PlaylistRepository } from './playlists.repository';
import { PlaylistContentGroupService } from './services/playlist-content-groups.service';
import { PlaylistService } from './services/playlists.service';

@Module({
  providers: [PlaylistService, PlaylistContentGroupService],
  imports: [
    TypeOrmModule.forFeature([
      PlaylistRepository,
      PlaylistToContentGroupRepository,
      ScreenRepository,
      ContentGroupRepository,
    ]),
    ScreenModule,
  ],
  controllers: [PlaylistController, PlaylistContentGroupController],
  exports: [PlaylistService],
})
export class PlaylistModule {}
