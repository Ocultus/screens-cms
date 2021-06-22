import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/users/user.entity';
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
@CrudAuth({
  property: 'user',
  filter: (user: User) => ({
    userId: user.id,
  }),
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
