import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
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

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Dvd)
  @JoinColumn()
  dvd: Dvd;
}
