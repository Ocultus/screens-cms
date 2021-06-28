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
export const positionUniqueConstraint = 'UQ_POSITION';
@Entity({ name: tableName })
@Unique(positionUniqueConstraint, ['playlistId', 'position'])
@Check(`"position" > 0`)
@Check(`"playTime" > 0`)
export class PlaylistToContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'playlistId', type: 'uuid' })
  playlistId: string;

  @Column({ name: 'contentId', type: 'uuid' })
  contentId: string;

  @Column({ type: 'integer' })
  position: number;

  @Column({ name: 'playTime', type: 'real' })
  playTime: number;

  //Relations
  @ManyToOne(() => Playlist, (playlist) => playlist.playlistToContents)
  playlist?: Playlist;

  @ManyToOne(() => Content, (content) => content.playlistToContents)
  content?: Content;
}
