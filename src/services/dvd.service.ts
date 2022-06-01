import { Request } from "express";
import { Dvd } from "../entities";
import { dvdRepository, stockRepository } from "../repositories";

class DvdService {
  registerDvdService = async ({ body }: Request) => {
    let outputDvds: Dvd[] = [];

    for (let item of body.dvds) {
      let { name, duration, quantity, price } = item;

      let stock = await stockRepository.save({ quantity, price });

      let dvd = await dvdRepository.save({ name, duration, stock });

      outputDvds.push(dvd);
    }

    return { dvds: outputDvds };
  };

  getAllDvdsService = async ({ body }: Request) => {
    const dvds = await dvdRepository.findAll();
    return dvds;
  };
}

export default new DvdService();
