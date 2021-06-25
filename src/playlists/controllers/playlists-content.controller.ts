import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ResponseContentsDto } from 'src/contents/contents.dto';
import { Playlist } from '../playlist.entity';
import { PlaylistContentService } from '../services/playlists-content.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('playlists')
@Controller('playlists')
export class PlaylistContentController {
  constructor(
    private readonly playlistContentService: PlaylistContentService,
  ) {}

  @ApiParam({ name: 'id' })
  @Get(':id/contents')
  @ApiOperation({ summary: 'Get contents by playlist id' })
  @ApiOkResponse({
    description: 'The content have been successfully found',
    type: ResponseContentsDto,
  })
  async getContents(
    @Param('id') playlistId: Playlist['id'],
  ): Promise<ResponseContentsDto> {
    return this.playlistContentService.getContents(playlistId);
  }
}
