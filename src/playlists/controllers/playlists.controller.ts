import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/users/user.entity';
import { CheckPlaylistOwnerGuard } from '../guards/playlist-owner.guard';
import { Playlist } from '../playlist.entity';
import { CreatePlaylistDto, UpdatePlaylistDto } from '../playlists.dto';
import { PlaylistService } from '../services/playlists.service';

@Crud({
  model: {
    type: Playlist,
  },
  dto: {
    create: CreatePlaylistDto,
    update: UpdatePlaylistDto,
  },
  routes: {
    only: [
      'createOneBase',
      'deleteOneBase',
      'getManyBase',
      'getOneBase',
      'updateOneBase',
    ],
    deleteOneBase: {
      decorators: [UseGuards(CheckPlaylistOwnerGuard)],
    },
    updateOneBase: {
      decorators: [UseGuards(CheckPlaylistOwnerGuard)],
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
@CrudAuth({
  property: 'user',
  persist: (user: User) => ({
    userId: user.id,
  }),
})
@ApiBearerAuth()
@ApiTags('playlists')
@UseGuards(JwtAuthGuard)
@Controller('playlists')
export class PlaylistController implements CrudController<Playlist> {
  constructor(readonly service: PlaylistService) {}
}
