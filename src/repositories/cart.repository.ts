import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Cart } from "../entities";

export interface IOrderRepository {
  save: (cart: Omit<Cart, "id">) => Promise<Cart>;
  findAll: () => Promise<Array<Cart>>;
  findOneBy: (payload: object) => Promise<Cart | null>;
}

class OrderRepository implements IOrderRepository {
  private ormRepo: Repository<Cart>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Cart);
  }

  save = async (cart: Omit<Cart, "id">) => {
    return await this.ormRepo.save(cart);
  };

  findAll: () => Promise<Array<Cart>> = async () => {
    return await this.ormRepo.find();
  };

  findOneBy = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
}

export default new OrderRepository();
