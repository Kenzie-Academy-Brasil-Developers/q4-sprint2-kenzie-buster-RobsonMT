import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Stock } from "./Stock";

@Entity("dvds")
export class Dvd {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  duration: string;

  @OneToOne(() => Stock)
  @JoinColumn()
  stock: Stock;
}
