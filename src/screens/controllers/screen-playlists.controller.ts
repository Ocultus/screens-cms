import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ScreenPlaylistService } from '../services/screens-playlist.service';
import {
  CreatePlaylistDto,
  ResponsePlaylistDto,
} from 'src/playlists/playlists.dto';
import { CheckScreenExistsInterceptor } from '../screens-exists.interceptor';
import { Playlist } from 'src/playlists/playlist.entity';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/users/user.entity';

@Crud({
  model: {
    type: Playlist,
  },
  dto: {
    create: CreatePlaylistDto,
  },
  serialize: {
    create: ResponsePlaylistDto,
    get: ResponsePlaylistDto,
  },
  routes: {
    only: ['createOneBase', 'getManyBase'],
    createOneBase: {
      interceptors: [CheckScreenExistsInterceptor],
    },
  },
  params: {
    id: {
      field: 'screenId',
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
@UseGuards(JwtAuthGuard)
@ApiTags('screens')
@Controller('screens/:id/playlists')
export class ScreenPlaylistController implements CrudController<Playlist> {
  constructor(readonly service: ScreenPlaylistService) {}
}
