import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { association } from './association.entity';

@Entity()
export class service{
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 100 })
  title;

  @Column("varchar", { length: 500, nullable: true})
  description;

  @Column({nullable:true})
  price: number;

  @Column({default:true})
  state: boolean;

  @Column("datetime", { nullable: true, default: () => "CURRENT_TIMESTAMP" })
  created_at;

  @ManyToOne(() => association, association => association.id,{onDelete: 'CASCADE' })
  association_id:number;

}


