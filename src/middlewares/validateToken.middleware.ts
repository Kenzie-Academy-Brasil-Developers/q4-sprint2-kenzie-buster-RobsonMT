import { Request, Response, NextFunction } from "express";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ErrorHTTP } from "../errors";

dotenv.config();

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new ErrorHTTP(401, "Missing authorization token.");
  }

  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        error: {
          name: "JsonWebTokenError",
          message: "jwt malformed",
        },
      });
    }

    req.decoded = decoded as User;

    next();
  });
};

export default validateToken;
