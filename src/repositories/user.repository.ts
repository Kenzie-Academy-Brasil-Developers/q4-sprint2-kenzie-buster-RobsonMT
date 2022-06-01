import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";

export interface IUserRepository {
  save: (user: Omit<User, "id">) => Promise<User>;
  findAll: () => Promise<Array<User>>;
  findOneBy: (payload: object) => Promise<User | null>;
}

class UserRepository implements IUserRepository {
  private ormRepo: Repository<User>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(User);
  }

  save = async (user: Omit<User, "id">) => {
    return await this.ormRepo.save(user);
  };

  findAll: () => Promise<Array<User>> = async () => {
    return await this.ormRepo.find();
  };

  findOneBy = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
}

export default new UserRepository();
