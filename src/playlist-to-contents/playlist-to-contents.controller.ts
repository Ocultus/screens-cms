import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PlaylistToContent } from './playlist-to-content.entity';
import {
  CreatePlaylistToContentDto,
  UpdatePlaylistToContentDto,
} from './playlist-to-contents.dto';
import { PlaylistToContentService } from './services/playlist-to-contents.service';

@Crud({
  model: {
    type: PlaylistToContent,
  },
  dto: {
    create: CreatePlaylistToContentDto,
    update: UpdatePlaylistToContentDto,
  },
  routes: {
    only: [
      'createOneBase',
      'deleteOneBase',
      'getManyBase',
      'getOneBase',
      'updateOneBase',
    ],
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
@ApiTags('playlist-to-contents')
@Controller('playlist-to-contents')
export class PlaylistToContentController
  implements CrudController<PlaylistToContent>
{
  constructor(readonly service: PlaylistToContentService) {}
}
