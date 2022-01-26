import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { ticket } from './ticket.entity';

@Entity()
export class image{
  @PrimaryGeneratedColumn()
  id: number;

  @Column("blob")
  image;

  @ManyToOne(() => ticket, ticket => ticket.id)
  ticket_id: number; 

  @Column("datetime", { nullable: true, default: () => "CURRENT_TIMESTAMP" })
  created_at;
}


