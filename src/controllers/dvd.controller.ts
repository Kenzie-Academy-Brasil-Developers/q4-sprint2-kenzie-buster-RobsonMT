import { Request, Response } from "express";
import { dvdService } from "../services";

class DvdController {
  registerDvdController = async (req: Request, res: Response) => {
    const dvd = await dvdService.registerDvdService(req);
    return res.status(201).json({ dvds: dvd });
  };

  getAllDvdsConstroller = async (req: Request, res: Response) => {
    const dvds = await dvdService.getAllDvdsService(req);
    return res.status(200).json(dvds);
  };
}

export default new DvdController();
