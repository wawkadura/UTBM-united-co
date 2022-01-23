import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { users } from './user.entity';

@Entity()
export class payment{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  card_number: number;

  @Column("date", { nullable: true })
  expire_date;

  @ManyToOne(() => users, users => users.id)
  user_id: number; 

  @Column("datetime", { nullable: true, default: () => "CURRENT_TIMESTAMP" })
  created_at;
}


