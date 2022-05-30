import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("stock")
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  quantity: number;

  @Column({ type: "numeric" })
  price: number;
}
