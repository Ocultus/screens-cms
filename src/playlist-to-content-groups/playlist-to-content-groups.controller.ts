import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CheckContentGroupExistsInterceptor } from 'src/contentGroups/content-groups-exists.interceptor';
import { CheckPlaylistExistsInterceptor } from 'src/playlists/playlists-exists.interceptor';
import { PlaylistToContentGroup } from './playlist-to-content-group.entity';
import {
  CreatePlaylistToContentGroupDto,
  ResponsePlaylistToContentGroupDto,
  UpdatePlaylistToContentGroupDto,
} from './playlist-to-content-groups.dto';
import { PlaylistToContentGroupService } from './services/playlist-to-content-groups.service';

@Crud({
  model: {
    type: PlaylistToContentGroup,
  },
  dto: {
    create: CreatePlaylistToContentGroupDto,
    update: UpdatePlaylistToContentGroupDto,
  },
  serialize: {
    create: ResponsePlaylistToContentGroupDto,
    update: ResponsePlaylistToContentGroupDto,
    get: ResponsePlaylistToContentGroupDto,
  },
  routes: {
    only: ['getOneBase', 'createOneBase', 'deleteOneBase', 'updateOneBase'],
    createOneBase: {
      interceptors: [
        CheckPlaylistExistsInterceptor,
        CheckContentGroupExistsInterceptor,
      ],
    },
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('playlist-to-content-groups')
@Controller('playlist-to-content-groups')
export class PlaylistToContentGroupController
  implements CrudController<PlaylistToContentGroup>
{
  constructor(readonly service: PlaylistToContentGroupService) {}
}
