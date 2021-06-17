import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { CryptoModule } from './utils/crypto/crypto.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, CryptoModule],
})
export class AppModule {}
