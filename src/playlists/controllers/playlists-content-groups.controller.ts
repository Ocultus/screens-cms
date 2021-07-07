import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ResponseContentGroupsDto } from 'src/contentGroups/content-groups.dto';
import { Playlist } from '../playlist.entity';
import { PlaylistContentGroupService } from '../services/playlist-content-groups.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('playlists')
@Controller('playlists')
export class PlaylistContentGroupController {
  constructor(
    private readonly playlistContentGroupService: PlaylistContentGroupService,
  ) {}

  @ApiParam({ name: 'id' })
  @Get(':id/content-groups')
  @ApiOperation({ summary: 'Get content group by playlist id' })
  @ApiOkResponse({
    description: 'The content group have been successfully found',
    type: ResponseContentGroupsDto,
  })
  async getContents(
    @Param('id') playlistId: Playlist['id'],
  ): Promise<ResponseContentGroupsDto> {
    return this.playlistContentGroupService.getContents(playlistId);
  }
}