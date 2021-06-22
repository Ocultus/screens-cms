import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { CryptoModule } from './utils/crypto/crypto.module';
import { EventModule } from './events/events.module';
import { ScreenModule } from './screens/screens.module';
import { PlaylistModule } from './playlists/playlists.module';
import { ContentModule } from './contents/contents.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    CryptoModule,
    EventModule,
    ScreenModule,
    PlaylistModule,
    ContentModule,
  ],
  providers: [],
})
export class AppModule {}
