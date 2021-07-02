import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ProfileDto } from '../dto/profile.dto';
import { User } from '../../users/user.entity';
import { UserRepository } from 'src/users/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from '../auth-types';
import { AUTH0_AUDIENCE } from 'src/config/configuration';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async findByEmail(email: User['email']): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async save(email: string): Promise<User> {
    return this.userRepository.save({ email });
  }

  async getProfile(user: JwtPayload): Promise<ProfileDto> {
    if (!user) {
      throw new UnauthorizedException();
    }
    const email = user[`${AUTH0_AUDIENCE}/email`];
    return { email: email };
  }
}
