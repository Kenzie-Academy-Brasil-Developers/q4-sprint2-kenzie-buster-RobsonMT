import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Dvd } from "./Dvd";
import { User } from "./User";

@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  paid?: boolean;

  @Column({ type: "float" })
  total: number;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Dvd)
  @JoinColumn([{ name: "dvd_id", referencedColumnName: "id" }])
  dvd: Dvd;
}
