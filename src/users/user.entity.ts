import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

const tableName = 'users';
@Entity({
  name: tableName,
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;
}
