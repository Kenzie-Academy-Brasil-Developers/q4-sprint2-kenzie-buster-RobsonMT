import { Express } from "express";
import userRoutes from "./user.routes";
import dvdRoutes from "./dvd.routes";

const registerRouters = (app: Express): void => {
  app.use("/api", userRoutes);
  app.use("/api", dvdRoutes);
};

export default registerRouters;
