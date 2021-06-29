import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { CryptoModule } from './utils/crypto/crypto.module';
import { EventModule } from './events/events.module';
import { ScreenModule } from './screens/screens.module';
import { PlaylistModule } from './playlists/playlists.module';
import { ContentModule } from './contents/contents.module';
import { PlaylistToContentModule } from './playlist-to-contents/playlist-to-contents.module';
import { FileModule } from './files/files.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    CryptoModule,
    EventModule,
    ScreenModule,
    PlaylistModule,
    ContentModule,
    PlaylistToContentModule,
    FileModule,
  ],
  providers: [],
})
export class AppModule {}
