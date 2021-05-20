import { Request, Response } from 'express';
import BranchServices from './services';

class BranchController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    const longitude: string = req.query.lon as string;
    const latitude: string = req.query.lat as string;

    if (parseFloat(latitude) && parseFloat(longitude)) {
      const branch = await BranchServices.getNearest(
        Number(longitude),
        Number(latitude)
      );

      if (branch) return res.json(branch);

      return res.status(404).json();
    }

    const branches = await BranchServices.getAll();

    return res.json(branches);
  }
}

export default new BranchController();
