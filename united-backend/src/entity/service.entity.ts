import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { association } from './association.entity';

@Entity()
export class service{
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 100 })
  tittle;

  @Column("varchar", { length: 500, nullable: true})
  description;

  @Column({nullable:true})
  price: number;

  @Column({default:true})
  state: boolean;

  @Column("datetime", { nullable: true, default: () => "CURRENT_TIMESTAMP" })
  created_at;

  @OneToMany(() => association, association => association.id)
  association_id:number;

}


