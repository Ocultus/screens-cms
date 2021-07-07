import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Screen } from 'src/screens/screen.entity';
import { Event } from '../events/event.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const tableName = 'users';
@Entity({
  name: tableName,
})
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: String, format: 'email' })
  @Column({ type: 'varchar', unique: true })
  email: string;

  //Relations
  @ApiPropertyOptional({ type: () => [Event] })
  @OneToMany(() => Event, (event) => event.user, {
    cascade: true,
  })
  events?: Event[];

  @ApiPropertyOptional({ type: () => [Screen] })
  @OneToMany(() => Screen, (screen) => screen.user, {
    cascade: true,
  })
  screens?: Screen[];

  @ApiPropertyOptional({ type: () => [Playlist] })
  @OneToMany(() => Playlist, (playlist) => playlist.user, {
    cascade: true,
  })
  playlists?: Playlist;
}
