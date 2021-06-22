import { ApiProperty } from '@nestjs/swagger';
import { Content } from 'src/contents/content.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

const tableName = 'playlist-to-contents';
@Entity({ name: tableName })
export class PlaylistToContent {
  @ApiProperty({ type: String, format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  playlistId: string;

  @ApiProperty({ type: String, format: 'uuid' })
  @Column({ type: 'uuid' })
  contentId: string;

  @ApiProperty({ type: 'integer' })
  @Column({ type: 'integer' })
  position: number;

  @ApiProperty()
  @Column({ type: 'real' })
  playTime: number;

  //Relations
  @ManyToOne(() => Playlist, (playlist) => playlist.playlistToContent)
  playlist?: Playlist;

  @ManyToOne(() => Content, (content) => content.playlistToContent)
  content?: Content;
}
