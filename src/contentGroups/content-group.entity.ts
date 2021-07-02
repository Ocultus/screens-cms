import { Content } from 'src/contents/content.entity';
import { PlaylistToContentGroup } from 'src/playlist-to-content-groups/playlist-to-content-group.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum ContentGroupType {
  video = 'video',
  audio = 'audio',
  image = 'image',
  html = 'html',
}

const tableName = 'content-groups';
@Entity({ name: tableName })
export class ContentGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ContentGroupType })
  contentType: ContentGroupType;

  //Relations

  @OneToMany(
    () => PlaylistToContentGroup,
    (playlistToContentGroup) => playlistToContentGroup.contentGroup,
    {
      cascade: true,
    },
  )
  playlistToContentGroups?: PlaylistToContentGroup[];

  @OneToMany(() => Content, (content) => content.contentGroup, {
    cascade: true,
  })
  contents?: Content[];
}
