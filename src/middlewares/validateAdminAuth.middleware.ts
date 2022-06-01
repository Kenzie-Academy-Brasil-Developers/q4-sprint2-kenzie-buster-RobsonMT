import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories";
import dotenv from "dotenv";
import { ErrorHTTP } from "../errors";

dotenv.config();

const validateAdminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.decoded) {
    const user = await userRepository.findOneBy({ id: req.decoded.id });

    if (!user?.isAdm) {
      throw new ErrorHTTP(401, "Missing admin permision");
    }

    next();
  }
};

export default validateAdminAuth;
