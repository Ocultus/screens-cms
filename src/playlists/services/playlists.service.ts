import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CrudRequest, Override } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ScreenRepository } from 'src/screens/screens.repository';
import { Playlist } from '../playlist.entity';
import { UpdatePlaylistDto } from '../playlists.dto';
import { PlaylistRepository } from '../playlists.repository';

@Injectable()
export class PlaylistService extends TypeOrmCrudService<Playlist> {
  constructor(
    readonly repository: PlaylistRepository,
    private readonly screenRepository: ScreenRepository,
  ) {
    super(repository);
  }

  @Override()
  async updateOne(req: CrudRequest, dto: UpdatePlaylistDto) {
    if (dto.screenId) {
      const screen = await this.screenRepository.findOne(dto.screenId);
      if (!screen) {
        throw new NotFoundException('Screen don`t exists');
      }
    }
    try {
      return await super.updateOne(req, dto);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
