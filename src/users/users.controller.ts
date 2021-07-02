import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtPayload } from 'src/auth/auth-types';
import { AuthService } from 'src/auth/services/auth.service';
import { ProfileDto } from '../auth/dto/profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from './user.entity';
import { User as UserDecorator } from './users.decorator';

@ApiTags('users')
@Controller('users')
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 403, description: 'Forbidden' })
export class UserController {
  constructor(private readonly authService: AuthService) {}
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
