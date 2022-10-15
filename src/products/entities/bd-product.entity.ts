import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PRODUCT {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

 
}