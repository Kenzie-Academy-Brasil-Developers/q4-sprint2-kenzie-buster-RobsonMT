import { Express } from "express";
import userRoutes from "./user.routes";
import dvdRoutes from "./dvd.routes";
import cartRoutes from "./cart.routes";

const registerRouters = (app: Express): void => {
  app.use("/api", userRoutes);
  app.use("/api", dvdRoutes);
  app.use("/api", cartRoutes);
};

export default registerRouters;
