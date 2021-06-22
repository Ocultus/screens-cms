import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { CryptoModule } from './utils/crypto/crypto.module';
import { EventModule } from './events/events.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, CryptoModule, EventModule],
  providers: [],
})
export class AppModule {}
