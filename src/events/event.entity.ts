import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Screen } from 'src/screens/screen.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

const tableName = 'events';
@Entity({
  name: tableName,
})
export class Event {
  @ApiProperty({ type: String, format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty({ type: String, format: 'uuid' })
  @Column({ type: 'uuid' })
  userId: string;

  //Relations

  @OneToMany(() => Screen, (screen) => screen.event, {
    cascade: true,
  })
  screens?: Screen[];

  @ManyToOne(() => User, (user) => user.events, {
    onDelete: 'CASCADE',
  })
  user?: User;
}
