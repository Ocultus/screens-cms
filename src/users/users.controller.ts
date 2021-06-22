import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from 'src/auth/services/auth.service';
import { AuthDto, ResponseAuthDto } from '../auth/dto/auth.dto';
import { ProfileDto } from '../auth/dto/profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { User } from './user.entity';
import { User as UserDecorator } from './users.decorator';

@ApiTags('users')
@Controller('users')
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 403, description: 'Forbidden' })
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
  @HttpCode(200)
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
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@UserDecorator() user: User): Promise<ProfileDto> {
    return this.authService.getProfile(user);
  }
}
