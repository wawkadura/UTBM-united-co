import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { users } from './user.entity';

@Entity()
export class ticket{
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column("varchar", { length: 100, nullable: true })
  subject;

  @Column("varchar", { length: 500, nullable: true })
  comment;

  @Column("datetime", { nullable: true })
  pickup_date;

  @Column("datetime", { nullable: true })
  resolved_date;

  @ManyToOne(() => users, users => users.id)
  user_id: number; 

  @ManyToOne(() => users, users => users.id)
  support_id: number; 
  
  @Column("datetime", { nullable: true, default: () => "CURRENT_TIMESTAMP" })
  created_at;
}


