import { ApiProperty } from '@nestjs/swagger';
import { PlaylistToContent } from 'src/playlist-to-contents/playlist-to-content.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum ContentType {
  video,
  audio,
  image,
  html,
}

const tableName = 'contents';
@Entity({ name: tableName })
export class Content {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;

  @Column({ type: 'text' })
  @ApiProperty({ type: String, format: 'uri' })
  url: string;

  @Column({ type: 'enum', enum: ContentType })
  @ApiProperty({ enum: ContentType, enumName: 'ContentType' })
  contentType: ContentType;

  //Relations

  @OneToMany(
    () => PlaylistToContent,
    (playlistToContent) => playlistToContent.content,
  )
  playlistToContent?: PlaylistToContent[];
}
