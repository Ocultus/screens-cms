import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/services/auth.service';
import { JWT_SECRET } from 'src/config/configuration';
import { CryptoModule } from 'src/utils/crypto/crypto.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { LocalStrategy } from '../auth/strategies/local.strategy';
import { UserRepository } from './user.repository';
import { UserController } from './users.controller';

@Module({
  providers: [LocalStrategy, JwtStrategy, AuthService],
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '10h' },
    }),
    TypeOrmModule.forFeature([UserRepository]),
    CryptoModule,
  ],
  controllers: [UserController],
})
export class UserModule {}
