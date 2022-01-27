import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 20 })
  firstName;

  @Column("varchar", { length: 20 })
  lastName;

  @Column("varchar", { length: 320 })
  email;

  @Column("varchar", { length: 100 })
  password;

  @Column("varchar", { length: 100 })
  role;

  @Column("datetime", { nullable: true })
  email_verified_at;

  @Column("datetime", { nullable: true, default: () => "CURRENT_TIMESTAMP" })
  created_at;
}


