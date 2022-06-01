import { NextFunction, Request, Response } from "express";
import { ErrorHTTP } from "../errors";
import { dvdRepository, userRepository } from "../repositories";

const getDvdByIdOr404 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { dvdId } = req.params;

    const foundDvd = await dvdRepository.findOneBy({ id: dvdId });

    if (!foundDvd) {
      throw new Error();
    }

    req.dvd = foundDvd;

    next();
  } catch (err: any) {
    if (err instanceof Error) {
      throw new ErrorHTTP(404, "dvd not found");
    }
  }
};

export default getDvdByIdOr404;
