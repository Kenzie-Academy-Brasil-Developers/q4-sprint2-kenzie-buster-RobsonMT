import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../entities";
import { ErrorHTTP } from "../errors";

dotenv.config();

const validateCreateAdminPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.isAdm) {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ErrorHTTP(401, "Missing authorization token.");
    }

    jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded) => {
      if (error) {
        throw new ErrorHTTP(401, "Invalid token.");
      }

      req.decoded = decoded as User;
    });

    const user = await userRepository.findOneBy({ id: req.decoded.id });

    if (!user?.isAdm && req.body.isAdm) {
      throw new ErrorHTTP(401, "Missing admin permision");
    }
  }
  next();
};

export default validateCreateAdminPermission;
