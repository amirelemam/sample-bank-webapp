import { Request, Response } from 'express';
import { branches } from './services';
import logger from '../../common/logger';

class DbController {
  public async drop(req: Request, res: Response): Promise<Response> {
    try {
      await branches();
      return res.status(204).json();
    } catch (error) {
      logger.error('Error dropping database', error);
      return res.status(500).json();
    }
  }
}

export default new DbController();
