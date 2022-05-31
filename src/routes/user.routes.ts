import { Router } from "express";
import { userController } from "../controllers";
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

export default route;
