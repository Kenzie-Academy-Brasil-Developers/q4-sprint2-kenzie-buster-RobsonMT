import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import * as bcrypt from "bcrypt";
import { Order } from "./Order";

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

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  comparePwd = async (recievedPwd: string): Promise<boolean> => {
    return await bcrypt.compare(recievedPwd, this.password);
  };
}
