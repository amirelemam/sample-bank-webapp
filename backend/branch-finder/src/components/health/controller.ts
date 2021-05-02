import { Request, Response } from 'express';

class BranchController {
  public async isAlive(req: Request, res: Response): Promise<Response> {
    return res.json({
      message: "I'm alive!",
      version: process.env.npm_package_version,
    });
  }
}

export default new BranchController();
