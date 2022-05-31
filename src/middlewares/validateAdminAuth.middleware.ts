import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories";
import dotenv from "dotenv";

dotenv.config();

const validateAdminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.decoded) {
    const user = await userRepository.findOneBy({ id: req.decoded.id });

    if (!user?.isAdm && req.body.isAdm === true) {
      return res.status(401).json({ error: "missing admin permision" });
    }

    next();
  }
};

export default validateAdminAuth;
