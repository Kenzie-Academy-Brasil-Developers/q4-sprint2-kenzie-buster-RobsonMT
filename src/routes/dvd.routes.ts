import { Router } from "express";
import dvdController from "../controllers/dvd.controller";
import { ErrorHTTP } from "../errors";
import {
  validadeSchema,
  validateAdminAuth,
  validateToken,
} from "../middlewares";
import { registerDvdSchema } from "../schemas/dvd";

const route = Router();

route.post(
  "/dvds/register",
  validateToken,
  validateAdminAuth,
  validadeSchema(registerDvdSchema),
  dvdController.registerDvdController
);
route.get("/dvds", dvdController.getAllDvdsConstroller);
route.post("dvds/buy/:dvdId");
route.get("/error", async (req, res) => {
  throw new ErrorHTTP(500, "Debug error route"); ///
});

export default route;
