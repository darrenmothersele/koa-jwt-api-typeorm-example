import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn("uuid")
  uuid: number;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column()
  hashedPassword: string;

  @Column("simple-array")
  roles: Array<string> = [];

  @Column()
  emailVerified: boolean = false;

}
