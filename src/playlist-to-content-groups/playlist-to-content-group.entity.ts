import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, Min } from 'class-validator';
import { ContentGroup } from 'src/contentGroups/content-group.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import {
  Check,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

const tableName = 'playlist-to-content-groups';
export const positionUniqueConstraint = 'UQ_POSITION';
@Entity({ name: tableName })
@Unique(positionUniqueConstraint, ['playlistId', 'position'])
@Check(`"position" > 0`)
@Check(`"playTime" > 0`)
export class PlaylistToContentGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsUUID()
  @ApiProperty({ type: String, format: 'uuid' })
  @Column({ name: 'playlistId', type: 'uuid' })
  playlistId: string;

  @IsUUID()
  @ApiProperty({ type: String, format: 'uuid' })
  @Column({ name: 'contentGroupId', type: 'uuid' })
  contentGroupId: string;

  @Min(1)
  @ApiPropertyOptional({ type: 'integer' })
  @IsOptional()
  @Column({ type: 'integer' })
  position: number;

  @Min(1)
  @ApiProperty()
  @IsOptional()
  @Column({ name: 'playTime', type: 'real' })
  playTime: number;

  //Relations
  @ManyToOne(() => Playlist, (playlist) => playlist.playlistToContentGroups, {
    onDelete: 'CASCADE',
  })
  playlist?: Playlist;

  @ManyToOne(
    () => ContentGroup,
    (contentGroup) => contentGroup.playlistToContentGroups,
    {
      onDelete: 'CASCADE',
    },
  )
  contentGroup?: ContentGroup;
}
