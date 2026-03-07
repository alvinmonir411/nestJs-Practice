import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum userRole{
    user = "USER",
    admin = "ADMIN"
}

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique:true })
  email: string;

  @Column()
  phone: number;

  @Column()
  password: string;
  
  @Column({default:userRole.user})
  role:string
}


