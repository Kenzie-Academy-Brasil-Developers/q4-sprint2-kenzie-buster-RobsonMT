import { Request, Response } from "express";
import { userService } from "../services";

class UserController {
  insertUserController = async (req: Request, res: Response) => {
    const { status, message } = await userService.insertUserService(req);
    return res.status(status).json(message);
  };

  loginController = async (req: Request, res: Response) => {
    const { status, message } = await userService.loginService(req);
    return res.status(status).json(message);
  };
}

export default new UserController();
