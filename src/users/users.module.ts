import { Module } from '@nestjs/common';
import { UserService } from './services/users.service';
import { UserController } from './users.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
