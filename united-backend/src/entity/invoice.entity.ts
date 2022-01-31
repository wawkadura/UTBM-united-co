
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { subscription } from './subscription.entity';
import { users } from './user.entity';

@Entity()
export class invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 20 })
  name: string;

  @ManyToOne(() => users, (user) => user.id)
  user_id;

  @ManyToOne(() => subscription, (subscription) => subscription.id)
  subscription_id;

  @Column("datetime", { nullable: true, default: () => "CURRENT_TIMESTAMP" })
  created_at;
}