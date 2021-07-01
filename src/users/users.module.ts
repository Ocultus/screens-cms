import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { UserRepository } from './user.repository';
import { UserController } from './users.controller';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [PassportModule],
})
export class UserModule {}
