import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/services/auth.service';
import { AuthDto, ResponseAuthDto } from '../auth/dto/auth.dto';
import { ProfileDto } from '../auth/dto/profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { User } from './user.entity';
import { User as UserDecorator } from './users.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'User sign-up' })
  @ApiOkResponse({
    description: 'User has been successfully registred',
    type: ResponseAuthDto,
  })
  async signUp(@Body() signUpDto: AuthDto): Promise<ResponseAuthDto> {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'User sign-in' })
  @ApiOkResponse({
    description: 'User has been successfully logged-in',
    type: ResponseAuthDto,
  })
  @Post('sign-in')
  async signIn(@Body() signInDto: AuthDto): Promise<ResponseAuthDto> {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current profile' })
  @ApiOkResponse({
    description: 'The profile has been successfully got',
    type: ProfileDto,
  })
  @Get('profile')
  async getProfile(@UserDecorator() user: User): Promise<ProfileDto> {
    return this.authService.getProfile(user);
  }
}
