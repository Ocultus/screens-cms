import { ContentGroup } from 'src/contentGroups/content-group.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import {
  Check,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

const tableName = 'playlist-to-content-groups';
export const positionUniqueConstraint = 'UQ_POSITION';
@Entity({ name: tableName })
@Unique(positionUniqueConstraint, ['playlistId', 'position'])
@Check(`"position" > 0`)
@Check(`"playTime" > 0`)
export class PlaylistToContentGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'playlistId', type: 'uuid' })
  playlistId: string;

  @Column({ name: 'contentGroupId', type: 'uuid' })
  contentGroupId: string;

  @Column({ type: 'integer' })
  position: number;

  @Column({ name: 'playTime', type: 'real' })
  playTime: number;

  //Relations
  @ManyToOne(() => Playlist, (playlist) => playlist.playlistToContentGroups)
  playlist?: Playlist;

  @ManyToOne(
    () => ContentGroup,
    (contentGroup) => contentGroup.playlistToContentGroups,
  )
  contentGroup?: ContentGroup;
}
