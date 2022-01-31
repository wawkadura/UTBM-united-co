import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { favorite } from './favorite.entity';

@Entity()
export class users{
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 20, nullable: true })
  firstName;

  @Column("varchar", { length: 20 , nullable: true})
  lastName;

  @Column("varchar", { length: 320 ,nullable:false, unique:true})
  email;

  @Column("varchar", { length: 100 })
  password;

  @Column("varchar", { length: 100 })
  role;   

  @Column({default:true})
  state: boolean;

  @Column("datetime", { nullable: true })
  email_verified_at;

  @Column("datetime", { nullable: true, default: () => "CURRENT_TIMESTAMP" })
  created_at;
}
