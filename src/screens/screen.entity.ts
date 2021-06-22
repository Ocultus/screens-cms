import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ type: String, format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  title: string;

  @ApiProperty({ type: String, format: 'uuid' })
  @Column({ type: 'uuid' })
  userId: string;

  @ApiProperty({ type: String, format: 'uuid' })
  @Column({ type: 'uuid' })
  eventId: string;

  //Relations
  @ManyToOne(() => Event, (event) => event.screens, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  event?: Event;

  @ManyToOne(() => User, (user) => user.screens, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user?: User;

  @OneToOne(() => Playlist, (playlist) => playlist.screen)
  playlist?: Playlist;
}
