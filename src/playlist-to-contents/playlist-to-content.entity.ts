import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
