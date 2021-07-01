import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest, Override } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ScreenRepository } from 'src/screens/screens.repository';
import { Playlist, screenIdUniqueConstraint } from '../playlist.entity';
import { CreatePlaylistDto, UpdatePlaylistDto } from '../playlists.dto';
import { PlaylistRepository } from '../playlists.repository';

@Injectable()
export class PlaylistService extends TypeOrmCrudService<Playlist> {
  constructor(
    readonly repository: PlaylistRepository,
    @InjectRepository(ScreenRepository)
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
      if (error && error.constraint === screenIdUniqueConstraint) {
        throw new BadRequestException();
      }
      throw new BadRequestException();
    }
  }
}
