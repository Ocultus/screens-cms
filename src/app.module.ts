import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { CryptoModule } from './utils/crypto/crypto.module';
import { ScreenModule } from './screens/screens.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, CryptoModule, ScreenModule],
  providers: [],
})
export class AppModule {}
