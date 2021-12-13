import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class association{
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 20 })
  Name;

  @Column("varchar", { length: 10, nullable: true })
  acronym;

  @Column("varchar", { length: 50 , nullable: true })
  type;

  @Column("varchar", { length: 320 })
  email;

  @Column("varchar", { length: 200 , nullable: true })
  description;

  @Column("varchar", { length: 100 , nullable: true })
  address;

  @Column("varchar", { length: 50 , nullable: true })
  city;

  @Column("varchar", { length: 200 , nullable: true })
  website;

  @Column("varchar", { length: 12 , nullable: true })
  telephone;

  @Column()
  state: boolean;

  @Column({ unique: true })
  user_id: number;
  
  @Column("datetime", { nullable: true, default: () => "CURRENT_TIMESTAMP" })
  created_at;
}


