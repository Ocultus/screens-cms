import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistRepository } from './playlists.repository';
import { PlaylistService } from './services/playlists.service';

@Module({
  providers: [PlaylistService],
  imports: [TypeOrmModule.forFeature([PlaylistRepository])],
})
export class PlaylistModule {}
