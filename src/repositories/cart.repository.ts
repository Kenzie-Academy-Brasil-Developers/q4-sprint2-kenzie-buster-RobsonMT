import { Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Cart } from "../entities";

export interface ICartRepository {
  save: (cart: Omit<Cart, "id">) => Promise<Cart>;
  findAll: () => Promise<Array<Cart>>;
  findOneBy: (payload: object) => Promise<Cart | null>;
  update: (id: string, payload: Partial<Cart>) => Promise<UpdateResult>;
}

class CartRepository implements ICartRepository {
  private ormRepo: Repository<Cart>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Cart);
  }

  save = async (cart: Omit<Cart, "id">) => {
    return await this.ormRepo.save(cart);
  };

  findAll: () => Promise<Array<Cart>> = async () => {
    return await this.ormRepo.find({ relations: ["dvd"] });
  };

  findOneBy = async (payload: object) => {
    return await this.ormRepo.findOne({
      where: { ...payload },
      relations: ["dvd"],
    });
  };

  update = async (id: string, payload: Partial<Cart>) => {
    return await this.ormRepo.update(id, { ...payload });
  };
}

export default new CartRepository();
