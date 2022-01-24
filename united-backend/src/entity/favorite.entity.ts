import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { association } from './association.entity';
import { users } from './user.entity';

@Entity()
export class favorite{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => users, users => users.id)
  user_id: number; 
  
  @ManyToOne(() => association, association => association.id)
  association_id: number;

  @Column("datetime", { nullable: true, default: () => "CURRENT_TIMESTAMP" })
  created_at;
}


