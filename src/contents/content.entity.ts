import { ContentGroup } from 'src/contentGroups/content-group.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

const tableName = 'contents';
@Entity({ name: tableName })
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text' })
  url: string;
  @Column({ type: 'varchar' })
  key: string;
  @Column({ type: 'varchar' })
  category: string;
  @Column({ type: 'uuid' })
  contentGroupId: string;

  //Relations
  @ManyToOne(() => ContentGroup, (contentGroup) => contentGroup.contents, {
    onDelete: 'CASCADE',
  })
  contentGroup?: ContentGroup;
}
