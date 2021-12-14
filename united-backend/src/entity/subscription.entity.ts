import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { service } from './service.entity';
import { users } from './user.entity';

@Entity()
export class subscription{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable:true })
  price: number;

  @Column()
  duration: number;

  @Column("datetime")
  date; 
  
  @Column()
  state: boolean;

  @OneToMany(() => users, users => users.id)
  user_id:number;

  @OneToMany(() => service, service => service.id)
  service_id:number;

  @Column("datetime", { nullable: true, default: () => "CURRENT_TIMESTAMP" })
  created_at;

}


