import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ContentGroup } from 'src/contentGroups/content-group.entity';
import { PlaylistContentGroupService } from '../services/playlist-content-groups.service';

@Crud({
  model: {
    type: ContentGroup,
  },
  routes: {
    only: ['getManyBase'],
  },
  params: {
    id: {
      field: 'playlistId',
      type: 'uuid',
    },
  },
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('playlists')
@Controller('playlists/:id/content-groups')
export class PlaylistContentGroupController
  implements CrudController<ContentGroup>
{
  constructor(readonly service: PlaylistContentGroupService) {}
}
