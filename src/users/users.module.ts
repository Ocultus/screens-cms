import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWT_SECRET } from 'src/config/configuration';
import { CryptoModule } from 'src/utils/crypto/crypto.module';
import { UserService } from './services/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserRepository } from './user.repository';
import { UserController } from './users.controller';

@Module({
  providers: [LocalStrategy, JwtStrategy, UserService],
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
