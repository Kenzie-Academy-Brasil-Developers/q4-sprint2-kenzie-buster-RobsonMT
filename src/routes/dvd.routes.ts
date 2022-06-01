import { Router } from "express";
import { dvdController } from "../controllers";
import {
  validadeSchema,
  validateAdminAuth,
  validateToken,
} from "../middlewares";
import { registerDvdSchema } from "../schemas";

const route = Router();

route.post(
  "/dvds/register",
  validateToken,
  validateAdminAuth,
  validadeSchema(registerDvdSchema),
  dvdController.registerDvdController
);
route.get("/dvds", dvdController.getAllDvdsConstroller);

export default route;
