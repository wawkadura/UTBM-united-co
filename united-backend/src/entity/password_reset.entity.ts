import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class password_reset{
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 320 })
  email;

  @Column("varchar", { length: 200 })
  token;

  @Column("datetime", { nullable: true, default: () => "CURRENT_TIMESTAMP" })
  created_at;
}
