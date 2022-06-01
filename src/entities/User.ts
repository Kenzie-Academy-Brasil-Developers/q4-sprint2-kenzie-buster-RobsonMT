import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import * as bcrypt from "bcrypt";
import { Cart } from ".";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 20 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdm?: boolean;

  @OneToOne(() => Cart, (cart) => cart.user, { lazy: true })
  cart: Cart;

  comparePwd = async (recievedPwd: string): Promise<boolean> => {
    return await bcrypt.compare(recievedPwd, this.password);
  };
}
