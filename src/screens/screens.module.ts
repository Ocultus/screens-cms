import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistRepository } from 'src/playlists/playlists.repository';
import { ScreenPlaylistController } from './controllers/screen-playlist.controller';
import { ScreenController } from './controllers/screens.controller';
import { ScreenRepository } from './screens.repository';
import { ScreenPlaylistService } from './services/screen-playlist.service';
import { ScreenService } from './services/screens.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScreenRepository, PlaylistRepository])],
  providers: [ScreenService, ScreenPlaylistService],
  controllers: [ScreenController, ScreenPlaylistController],
})
export class ScreenModule {}
