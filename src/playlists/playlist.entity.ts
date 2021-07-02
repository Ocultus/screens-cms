import { User } from 'src/users/user.entity';
import { Screen } from 'src/screens/screen.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { PlaylistToContentGroup } from 'src/playlist-to-content-groups/playlist-to-content-group.entity';

const tableName = 'playlists';
export const screenIdUniqueConstraint = 'UNIQUE_SCREEN';
@Entity({
  name: tableName,
})
@Unique(screenIdUniqueConstraint, ['screenId'])
export class Playlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  screenId: string;

  //Relations
  @ManyToOne(() => User, (user) => user.playlists, {
    onDelete: 'CASCADE',
  })
  user?: User;

  @OneToOne(() => Screen, (screen) => screen.playlist, {
    onDelete: 'CASCADE',
  })
  screen?: Screen;

  @OneToMany(
    () => PlaylistToContentGroup,
    (playlistToContentGroup) => playlistToContentGroup.playlist,
    {
      cascade: true,
    },
  )
  playlistToContentGroups?: PlaylistToContentGroup[];
}
