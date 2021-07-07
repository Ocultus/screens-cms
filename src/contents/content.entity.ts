import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { ContentGroup } from 'src/contentGroups/content-group.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

const tableName = 'contents';
@Entity({ name: tableName })
export class Content {
  @ApiProperty({ type: String, format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({ type: String, format: 'uri' })
  @Column({ type: 'text' })
  url: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  key: string;
  @IsString()
  @ApiProperty()
  @Column({ type: 'varchar' })
  category: string;
  @IsUUID()
  @ApiProperty({ type: String, format: 'uuid' })
  @Column({ type: 'uuid' })
  contentGroupId: string;

  //Relations
  @ManyToOne(() => ContentGroup, (contentGroup) => contentGroup.contents, {
    onDelete: 'CASCADE',
  })
  contentGroup?: ContentGroup;
}
