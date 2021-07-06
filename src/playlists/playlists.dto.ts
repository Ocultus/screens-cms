import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { Playlist } from './playlist.entity';

export class CreatePlaylistDto extends PickType(Playlist, ['name']) {}

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ type: String, format: 'uuid' })
  screenId?: string;
}

export class ResponsePlaylistDto extends PickType(Playlist, [
  'id',
  'name',
  'userId',
  'screenId',
]) {}

export class ResponsePlaylistsDto {
  @ApiProperty({ type: () => [ResponsePlaylistDto] })
  playlists: ResponsePlaylistDto[];
}
