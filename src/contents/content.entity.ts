import { Playlist } from 'src/playlists/playlist.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum contentType {
  video,
  audio,
  image,
  html,
}

const tableName = 'contents';
@Entity({ name: tableName })
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'enum', enum: true })
  contentType: contentType;

  //Relations

  @ManyToMany(() => Playlist)
  @JoinTable({
    name: 'playlist-to-contents',
    joinColumn: { name: 'content', referencedColumnName: 'contentId' },
    inverseJoinColumn: { name: 'playlist', referencedColumnName: 'playlistId' },
  })
  playlists?: Playlist[];
}
