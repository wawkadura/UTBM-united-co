import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum newsletterStatus{
    Created=1,
    Inprogress=0,
    Done=2
}

@Entity()
export class newsletter{
  @PrimaryGeneratedColumn()
  id: number;

  @Column( { length: 320 ,nullable:false, unique:true})
  email:string;

  @Column({nullable:false,default:newsletterStatus.Created})
  status: newsletterStatus;

}


