import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistToContentController } from './playlist-to-contents.controller';
import { PlaylistToContentRepository } from './playlist-to-contents.repository';
import { PlaylistToContentService } from './services/playlist-to-contents.service';

@Module({
  providers: [PlaylistToContentService],
  imports: [TypeOrmModule.forFeature([PlaylistToContentRepository])],
  controllers: [PlaylistToContentController],
})
export class PlaylistToContentModule {}
