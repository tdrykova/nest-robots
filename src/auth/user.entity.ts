import * as bcrypt from "bcrypt";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @CreateDateColumn()
  createdAt: Date;


  async validatePassword(password: String): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password
  }
}
// function CreateDateColumn(): (target: User, propertyKey: "createdAt") => void {
//   throw new Error("Function not implemented.");
// }

