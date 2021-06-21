import { Content } from 'src/contents/content.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

const tableName = 'playlist-to-contents';
@Entity({ name: tableName })
export class PlaylistToContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  playlistId: string;

  @Column({ type: 'uuid' })
  contentId: string;

  @Column({ type: 'integer' })
  position: number;

  @Column({ type: 'real' })
  playTime: number;

  //Relations
  @ManyToOne(() => Playlist, (playlist) => playlist.playlistToContent)
  playlist?: Playlist;

  @ManyToOne(() => Content, (content) => content.playlistToContent)
  content?: Content;
}
