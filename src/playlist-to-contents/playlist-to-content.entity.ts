import { ApiProperty } from '@nestjs/swagger';
import { Content } from 'src/contents/content.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import {
  Check,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

const tableName = 'playlist-to-contents';
@Entity({ name: tableName })
@Unique('UQ_NAMES', ['playlistId', 'contentId', 'position'])
@Check(`"position" > 0`)
@Check(`"playTime" > 0`)
export class PlaylistToContent {
  @ApiProperty({ type: String, format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'playlistId', type: 'uuid' })
  playlistId: string;

  @ApiProperty({ type: String, format: 'uuid' })
  @Column({ name: 'contentId', type: 'uuid' })
  contentId: string;

  @ApiProperty({ name: 'position', type: 'integer' })
  @Column({ type: 'integer' })
  position: number;

  @ApiProperty()
  @Column({ name: 'playTime', type: 'real' })
  playTime: number;

  //Relations
  @ManyToOne(() => Playlist, (playlist) => playlist.playlistToContent)
  playlist?: Playlist;

  @ManyToOne(() => Content, (content) => content.playlistToContent)
  content?: Content;
}
