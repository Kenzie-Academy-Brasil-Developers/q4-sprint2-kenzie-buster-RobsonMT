import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";

export interface IUserRepository {
  save: (user: User) => Promise<User>;
  findAll: () => Promise<Array<User>>;
  findOneBy: (payload: object) => Promise<User | null>;
}

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  save = async (user: User) => await this.repository.save(user);

  findAll: () => Promise<Array<User>> = async () => {
    return await this.repository.find();
  };

  findOneBy = async (payload: object) => {
    return await this.repository.findOneBy({ ...payload });
  };
}

export default new UserRepository();
