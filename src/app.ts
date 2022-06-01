import "express-async-errors";
import express from "express";
import { errorHandling } from "./middlewares";
import registerRouters from "./routes";

const app = express();

app.use(express.json());

registerRouters(app);

app.use(errorHandling);

export default app;
