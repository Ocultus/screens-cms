import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistController } from './playlists.controller';
import { PlaylistRepository } from './playlists.repository';
import { PlaylistService } from './services/playlists.service';

@Module({
  providers: [PlaylistService],
  imports: [TypeOrmModule.forFeature([PlaylistRepository])],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
