import { Express } from "express";
import userRoutes from "./user.routes";

const registerRouters = (app: Express): void => {
  app.use(userRoutes);
};

export default registerRouters;
