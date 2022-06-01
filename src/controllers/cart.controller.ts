import { Request, Response } from "express-serve-static-core";
import cartService from "../services/cart.service";

class CartController {
  buyDvdController = async (req: Request, res: Response) => {
    const cart = await cartService.buyDvdService(req);
    return res.status(201).json(cart);
  };

  payDvdController = async (req: Request, res: Response) => {
    const cart = await cartService.payDvdService(req);
    return res.status(200).json(cart);
  };
}

export default new CartController();
