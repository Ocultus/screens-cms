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
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

const tableName = 'playlists';
export const screenIdUniqueConstraint = 'UNIQUE_SCREEN';
@Entity({
  name: tableName,
})
@Unique(screenIdUniqueConstraint, ['screenId'])
export class Playlist {
  @ApiProperty({ type: String, format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
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
