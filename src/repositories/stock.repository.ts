import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Stock } from "../entities";

export interface IStockRepository {
  save: (stock: Omit<Stock, "id">) => Promise<Stock>;
  findAll: () => Promise<Array<Stock>>;
  findOneBy: (payload: object) => Promise<Stock | null>;
}

class StockRepository implements IStockRepository {
  private ormRepo: Repository<Stock>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Stock);
  }

  save = async (stock: Omit<Stock, "id">) => {
    return await this.ormRepo.save(stock);
  };

  findAll: () => Promise<Array<Stock>> = async () => {
    return await this.ormRepo.find();
  };

  findOneBy = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
}

export default new StockRepository();
