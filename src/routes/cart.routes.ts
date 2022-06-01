import { Router } from "express";

import { ErrorHTTP } from "../errors";
import { validadeSchema } from "../middlewares";
import { buyDvdSchema } from "../schemas";

const route = Router();

route.post("dvds/buy/:dvdId", validadeSchema(buyDvdSchema));
route.get("/error", async (req, res) => {
  throw new ErrorHTTP(500, "Debug error route"); ///
});

export default route;
