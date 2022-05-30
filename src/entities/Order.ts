import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Dvd } from "./Dvd";
import { User } from "./User";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  paid?: boolean;

  @Column({ type: "float" })
  total: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToMany(() => Dvd)
  @JoinTable()
  dvds: Dvd[];
}
