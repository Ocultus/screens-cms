import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { EventModule } from './events/events.module';
import { ScreenModule } from './screens/screens.module';
import { PlaylistModule } from './playlists/playlists.module';
import { ContentModule } from './contents/contents.module';
import { PlaylistToContentGroupModule } from './playlist-to-content-groups/playlist-to-contents-groups.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    EventModule,
    ScreenModule,
    PlaylistModule,
    ContentModule,
    PlaylistToContentGroupModule,
  ],
  providers: [],
})
export class AppModule {}
