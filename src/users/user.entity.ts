import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Screen } from 'src/screens/screen.entity';
import { Event } from '../events/event.entity';
import { Playlist } from 'src/playlists/playlist.entity';

const tableName = 'users';
@Entity({
  name: tableName,
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  //Relations
  @OneToMany(() => Event, (event) => event.user)
  events?: Event[];

  @OneToMany(() => Screen, (screen) => screen.user)
  screens?: Screen[];

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists?: Playlist;
}
