import { Event } from 'src/events/event.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

const tableName = 'screens';
@Entity({ name: tableName })
export class Screen {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  eventId: string;

  //Relations
  @ManyToOne(() => Event, (event) => event.screens, {
    onDelete: 'CASCADE',
  })
  event?: Event;

  @ManyToOne(() => User, (user) => user.screens, {
    onDelete: 'CASCADE',
  })
  user?: User;

  @OneToOne(() => Playlist, (playlist) => playlist.screen, {
    cascade: true,
  })
  playlist?: Playlist;
}
