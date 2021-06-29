import { File } from 'src/files/file.entity';
import { PlaylistToContent } from 'src/playlist-to-contents/playlist-to-content.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum ContentType {
  video = 'video',
  audio = 'audio',
  image = 'image',
  html = 'html',
}

const tableName = 'contents';
@Entity({ name: tableName })
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ContentType })
  contentType: ContentType;

  //Relations

  @OneToMany(
    () => PlaylistToContent,
    (playlistToContent) => playlistToContent.content,
  )
  playlistToContents?: PlaylistToContent[];

  @OneToMany(() => File, (file) => file.content)
  files?: File[];
}
