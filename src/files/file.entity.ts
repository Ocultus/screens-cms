import { Content } from 'src/contents/content.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

const tableName = 'files';
@Entity({ name: tableName })
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text' })
  url: string;
  @Column({ type: 'varchar' })
  key: string;
  @Column({ type: 'varchar' })
  category: string;
  @Column({ type: 'uuid' })
  contentId: string;

  //Relations
  @ManyToOne(() => Content, (content) => content.files, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  content?: Content;
}
