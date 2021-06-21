import { PlaylistToContent } from 'src/playlist-to-contents/playlist-to-content.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'enum', enum: contentType })
  contentType: contentType;

  //Relations

  @OneToMany(
    () => PlaylistToContent,
    (playlistToContent) => playlistToContent.content,
  )
  playlistToContent?: PlaylistToContent[];
}
