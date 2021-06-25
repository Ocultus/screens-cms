import { Controller, Get, Param, UseGuards } from '@nestjs/common';
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
import { ResponsePlaylistDto } from 'src/playlists/playlists.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('screens')
@Controller('screens')
export class ScreenPlaylistController {
  constructor(private readonly screenPlaylistService: ScreenPlaylistService) {}

  @ApiParam({ name: 'id' })
  @Get(':id/playlist')
  @ApiOperation({ summary: 'Get screens by event id' })
  @ApiOkResponse({
    description: 'The screens have been successfully found',
    type: ResponsePlaylistDto,
  })
  async getPlaylist(
    @Param('id') screenId: Screen['id'],
  ): Promise<ResponsePlaylistDto> {
    return this.screenPlaylistService.getPlaylist(screenId);
  }
}
