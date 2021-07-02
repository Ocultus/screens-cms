import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ScreenPlaylistService } from '../services/screens-playlist.service';
import { Screen } from '../screen.entity';
import {
  CreatePlaylistDto,
  ResponsePlaylistDto,
} from 'src/playlists/playlists.dto';
import { CheckScreenExistsInterceptor } from '../screens-exists.interceptor';
import { User } from 'src/users/users.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('screens')
@Controller('screens')
export class ScreenPlaylistController {
  constructor(private readonly screenPlaylistService: ScreenPlaylistService) {}

  @ApiParam({ name: 'id' })
  @Get(':id/playlist')
  @ApiOperation({ summary: 'Get playlists by screen id' })
  @ApiOkResponse({
    description: 'The screens have been successfully found',
    type: ResponsePlaylistDto,
  })
  async getPlaylist(
    @Param('id') screenId: Screen['id'],
  ): Promise<ResponsePlaylistDto> {
    return this.screenPlaylistService.getPlaylist(screenId);
  }

  @ApiParam({ name: 'id' })
  @Post(':id/playlist')
  @ApiOperation({ summary: 'Create a single playlist' })
  @ApiOkResponse({
    description: 'The screens have been successfully found',
    type: ResponsePlaylistDto,
  })
  @UseInterceptors(CheckScreenExistsInterceptor)
  async createPlaylist(
    @User('id') userId: string,
    @Body() createPlaylistDto: CreatePlaylistDto,
    @Param('id') screenId: Screen['id'],
  ): Promise<ResponsePlaylistDto> {
    return this.screenPlaylistService.createPlaylist(
      userId,
      createPlaylistDto,
      screenId,
    );
  }
}
