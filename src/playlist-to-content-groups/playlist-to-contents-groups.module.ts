import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentGroupModule } from 'src/contentGroups/content-groups.module';
import { ContentGroupRepository } from 'src/contentGroups/content-groups.repository';
import { PlaylistModule } from 'src/playlists/playlists.module';
import { PlaylistRepository } from 'src/playlists/playlists.repository';
import { PlaylistToContentGroupController } from './playlist-to-content-groups.controller';
import { PlaylistToContentGroupRepository } from './playlist-to-contents-groups.repository';
import { PlaylistToContentGroupService } from './services/playlist-to-content-groups.service';

@Module({
  providers: [PlaylistToContentGroupService],
  imports: [
    TypeOrmModule.forFeature([
      PlaylistToContentGroupRepository,
      PlaylistRepository,
      ContentGroupRepository,
    ]),
    ContentGroupModule,
    PlaylistModule,
  ],
  controllers: [PlaylistToContentGroupController],
})
export class PlaylistToContentGroupModule {}
