import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Screen } from 'src/screens/screen.entity';

const tableName = 'events';
@Entity({
  name: tableName,
})
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  userId: string;

  //Relations

  @OneToMany(() => Screen, (screen) => screen.event)
  screens?: Screen[];

  @ManyToOne(() => User, (user) => user.events, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  user?: User;
}
