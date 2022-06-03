import { Router } from "express";
import { cartController } from "../controllers";
import { getDvdByIdOr404, validadeSchema, validateToken } from "../middlewares";
import { buyDvdSchema } from "../schemas";

const route = Router();

route.post(
  "/dvds/buy/:dvdId",
  validateToken,
  getDvdByIdOr404,
  validadeSchema(buyDvdSchema),
  cartController.buyDvdController
);
route.put("/carts/pay", validateToken, cartController.payDvdController);

export default route;
