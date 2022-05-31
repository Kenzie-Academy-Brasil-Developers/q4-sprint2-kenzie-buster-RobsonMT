import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../entities";

dotenv.config();

const validateCreateAdminPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.isAdm) {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Missing authorization token." });
    }

    jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded) => {
      if (error) {
        return res.status(401).json({ error: "Invalid token." });
      }

      console.log("#");
      console.log(decoded);
      console.log("#");

      req.decoded = decoded as User;
    });

    const user = await userRepository.findOneBy({ id: req.decoded.id });

    if (!user?.isAdm && req.body.isAdm) {
      return res.status(401).json({ error: "missing admin permision" });
    }
  }
  next();
};

export default validateCreateAdminPermission;
