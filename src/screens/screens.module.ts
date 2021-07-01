import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from 'src/events/events.module';
import { EventRepository } from 'src/events/events.repository';
import { PlaylistRepository } from 'src/playlists/playlists.repository';
import { ScreenPlaylistController } from './controllers/screens-playlist.controller';
import { ScreenController } from './controllers/screens.controller';
import { ScreenRepository } from './screens.repository';
import { ScreenPlaylistService } from './services/screens-playlist.service';
import { ScreenService } from './services/screens.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ScreenRepository,
      PlaylistRepository,
      EventRepository,
    ]),
    EventModule,
  ],
  providers: [ScreenService, ScreenPlaylistService],
  controllers: [ScreenController, ScreenPlaylistController],
  exports: [ScreenService],
})
export class ScreenModule {}
