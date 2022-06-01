import { Request } from "express";
import { Dvd } from "../entities";
import { ErrorHTTP } from "../errors";
import { dvdRepository, stockRepository } from "../repositories";

class DvdService {
  registerDvdService = async ({ body }: Request) => {
    if (!body.dvds.length) {
      return new ErrorHTTP(400, "Dvds array can not be empty.");
    }

    let outputDvds: Dvd[] = [];

    for (let item of body.dvds) {
      let { name, duration, quantity, price } = item;

      let stock = await stockRepository.save({ quantity, price });

      let dvd = await dvdRepository.save({ name, duration, stock });

      outputDvds.push(dvd);
    }

    return { dvds: outputDvds };
  };

  getAllDvdsService = async ({ body }: Request): Promise<Dvd[]> => {
    const dvds: Dvd[] = await dvdRepository.findAll();
    return dvds;
  };
}

export default new DvdService();
