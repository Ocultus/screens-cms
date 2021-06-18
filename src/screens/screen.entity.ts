import { Event } from 'src/events/event.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

const tableName = 'screen';
@Entity({ name: tableName })
export class Screen {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'uuid' })
  userId: string;

  //Relations
  @ManyToOne(() => Event, (event) => event.screens, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  event?: Event;

  @ManyToOne(() => User, (user) => user.screens, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user?: User;
}
