import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ticket } from './ticket.entity';

@Entity()
export class image{
  @PrimaryGeneratedColumn()
  id: number;

  @Column("blob")
  image;

  @OneToMany(() => ticket, ticket => ticket.id)
  ticket_id: number; 

  @Column("datetime", { nullable: true, default: () => "CURRENT_TIMESTAMP" })
  created_at;
}


