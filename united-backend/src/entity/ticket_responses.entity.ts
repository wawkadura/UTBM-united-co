import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ticket } from './ticket.entity';
import { users } from './user.entity';

@Entity()
export class ticketResponses{
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 500, nullable: true })
  comment;

  @ManyToOne(() => ticket, ticket => ticket.id)
  ticket_id: number; 

  @ManyToOne(() => users, users => users.id)
  user_id: number; 
  
  @Column("datetime", { nullable: true, default: () => "CURRENT_TIMESTAMP" })
  created_at;
}


