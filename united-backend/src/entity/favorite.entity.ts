import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { association } from './association.entity';
import { users } from './user.entity';

@Entity()
export class favorite{
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => users, users => users.id)
  user_id: number; 
  
  @OneToMany(() => association, association => association.id)
  association_id: number;

  @Column("datetime", { nullable: true, default: () => "CURRENT_TIMESTAMP" })
  created_at;
}


