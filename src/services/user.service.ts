import { Request } from "express";
import { User } from "../entities";
import userRepository from "../repositories/user.repository";
import { serializedCreateUserSchema } from "../schemas";
import jwt from "jsonwebtoken";

export interface IStatusMesage {
  status: number;
  message: object;
}

class UserService {
  insertUserService = async ({ body }: Request): Promise<IStatusMesage> => {
    const userAlreadyExist: User = await userRepository.findOneBy({
      email: body.email.toLowerCase(),
    });

    if (userAlreadyExist) {
      return {
        status: 409,
        message: { error: `Key (email)=(${body.email}) already exists.` },
      };
    }

    const newUser: User = await userRepository.save({ ...body });

    return {
      status: 201,
      message: await serializedCreateUserSchema.validate(newUser, {
        stripUnknown: true,
      }),
    };
  };

  loginService = async ({ body }: Request): Promise<IStatusMesage> => {
    const foundUser: User = await userRepository.findOneBy({
      email: body.email.toLowerCase(),
    });

    if (!foundUser) {
      return { status: 403, message: { message: "Wrong email/password." } };
    }

    if (!(await foundUser.comparePwd(body.password))) {
      return { status: 403, message: { message: "Wrong email/password." } };
    }

    const token = jwt.sign({ ...foundUser }, process.env.SECRET_KEY as string, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return { status: 200, message: { token } };
  };
}

export default new UserService();
