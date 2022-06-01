import { Router } from "express";
import { userController } from "../controllers";
import { ErrorHTTP } from "../errors";
import { validadeSchema, validateCreateAdminPermission } from "../middlewares";
import { createUserSchema, loginUserSchema } from "../schemas";

const route = Router();

route.post(
  "/users/register",
  validadeSchema(createUserSchema),
  validateCreateAdminPermission,
  userController.insertUserController
);
route.post(
  "/users/login",
  validadeSchema(loginUserSchema),
  userController.loginController
);
route.get("/error", async (req, res) => {
  throw new ErrorHTTP(500, "Debug error route");
});

export default route;
