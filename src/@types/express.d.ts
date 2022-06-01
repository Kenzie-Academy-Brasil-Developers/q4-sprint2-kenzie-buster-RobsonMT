import { Dvd } from "../entities";
import { User } from "../entities/User";

declare global {
  namespace Express {
    interface Request {
      dvd: Dvd;
      decoded: User;
    }
  }
}
