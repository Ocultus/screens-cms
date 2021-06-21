import { User } from 'src/users/user.entity';
import { Screen } from 'src/screens/screen.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Content } from 'src/contents/contents.entity';

const tableName = 'playlists';
@Entity({
  name: tableName,
})
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
    cascade: true,
  })
  user?: User;

  @OneToOne(() => Screen, (screen) => screen.playlist, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  screen?: Screen;

  @ManyToMany(() => Content)
  @JoinTable({
    name: 'playlist-to-contents',
    joinColumn: { name: 'playlist', referencedColumnName: 'playlistId' },
    inverseJoinColumn: { name: 'content', referencedColumnName: 'contentId' },
  })
  contents?: Content[];
}
