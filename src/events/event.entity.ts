import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Screen } from 'src/screens/screen.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const tableName = 'events';
@Entity({
  name: tableName,
})
export class Event {
  @ApiProperty({ type: String, format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty({ type: String, format: 'uuid' })
  @Column({ type: 'uuid' })
  userId: string;

  //Relations

  @ApiPropertyOptional({ type: () => [Screen] })
  @OneToMany(() => Screen, (screen) => screen.event)
  screens?: Screen[];

  @ApiPropertyOptional({ type: () => User })
  @ManyToOne(() => User, (user) => user.events, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  user?: User;
}
