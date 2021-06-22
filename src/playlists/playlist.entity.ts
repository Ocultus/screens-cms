import { User } from 'src/users/user.entity';
import { Screen } from 'src/screens/screen.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlaylistToContent } from 'src/playlist-to-contents/playlist-to-content.entity';
import { ApiProperty } from '@nestjs/swagger';

const tableName = 'playlists';
@Entity({
  name: tableName,
})
export class Playlist {
  @ApiProperty({ type: String, format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty({ type: String, format: 'uuid' })
  @Column({ type: 'uuid' })
  userId: string;

  @ApiProperty({ type: String, format: 'uuid' })
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

  @OneToMany(
    () => PlaylistToContent,
    (playlistToContent) => playlistToContent.playlist,
  )
  playlistToContent?: PlaylistToContent[];
}
