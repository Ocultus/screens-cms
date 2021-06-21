import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from 'src/utils/crypto/crypto.service';
import { AuthDto, ResponseAuthDto } from '../dto/auth.dto';
import { ProfileDto } from '../dto/profile.dto';
import { User } from '../../users/user.entity';
import { UserRepository } from '../../users/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
  ) {}

  async findMany(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: User['email']): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async save(email: string, password: string): Promise<User> {
    return this.userRepository.save({ email, password });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }
    const isValid = await this.cryptoService.comparePasswords(
      password,
      user.password,
    );
    return isValid ? user : null;
  }

  async signIn(signInDto: AuthDto): Promise<ResponseAuthDto> {
    const { email, password } = signInDto;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new BadRequestException();
    }
    const payload = { email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken: accessToken, userId: user.id, userEmail: user.email };
  }

  async signUp(signUpDto: AuthDto): Promise<ResponseAuthDto> {
    const { email, password } = signUpDto;
    const user = await this.findByEmail(email);
    if (user) {
      throw new BadRequestException();
    }
    const hashedPassword = await this.cryptoService.getHashPassword(password);
    const savedUser = await this.save(email, hashedPassword);
    const payload = { email, userId: savedUser.id };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken: accessToken,
      userId: savedUser.id,
      userEmail: savedUser.email,
    };
  }

  async getProfile(user: User): Promise<ProfileDto> {
    if (!user) {
      throw new UnauthorizedException();
    }
    const { id, password, ...profile } = user;
    return profile;
  }
}
