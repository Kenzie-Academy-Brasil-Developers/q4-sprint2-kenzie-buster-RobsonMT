import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Dvd } from "../entities";

export interface IDvdRepository {
  save: (dvd: Omit<Dvd, "id">) => Promise<Dvd>;
  // saveMany: (dvds: Omit<Dvd[], "id">) => Promise<Dvd[]>;
  findAll: () => Promise<Array<Dvd>>;
  findOneBy: (payload: object) => Promise<Dvd | null>;
}

class DvdRepository implements IDvdRepository {
  private ormRepo: Repository<Dvd>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Dvd);
  }

  save = async (dvd: Omit<Dvd, "id">) => {
    return await this.ormRepo.save(dvd);
  };

  // saveMany = async (dvds: Omit<Dvd[], "id">) => {
  //   const insertedDvds = await this.ormRepo
  //     .createQueryBuilder()
  //     .insert()
  //     .values(dvds)
  //     .execute();

  //   const returnDVds = [];

  //   for (let { id } of insertedDvds.generatedMaps) {
  //     returnDVds.push(await this.ormRepo.findOneBy(id));
  //   }

  //   return returnDVds;
  // };

  findAll: () => Promise<Array<Dvd>> = async () => {
    return await this.ormRepo.find({ relations: ["stock"] });
  };

  findOneBy = async (payload: object) => {
    return await this.ormRepo.findOne({
      where: { ...payload },
      relations: ["stock"],
    });
  };
}

export default new DvdRepository();
