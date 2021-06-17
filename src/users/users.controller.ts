import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthDto, ResponseAuthDto } from './dto/auth.dto';
import { ProfileDto } from './dto/profile.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from './services/users.service';
import { User } from './user.entity';
import { User as UserDecorator } from './users.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'User sign-up' })
  @ApiOkResponse({
    description: 'User has been successfully registred',
    type: ResponseAuthDto,
  })
  async signUp(@Body() signUpDto: AuthDto): Promise<ResponseAuthDto> {
    return this.userService.signUp(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'User sign-in' })
  @ApiOkResponse({
    description: 'User has been successfully logged-in',
    type: ResponseAuthDto,
  })
  @Post('sign-in')
  async signIn(@Body() signInDto: AuthDto): Promise<ResponseAuthDto> {
    return this.userService.signIn(signInDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current profile' })
  @ApiOkResponse({
    description: 'The profile has been successfully got',
    type: ProfileDto,
  })
  @Get('profile')
  async getProfile(@UserDecorator() user: User): Promise<ProfileDto> {
    return this.userService.getProfile(user);
  }
}
