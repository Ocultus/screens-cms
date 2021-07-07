import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
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

  @IsString()
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
