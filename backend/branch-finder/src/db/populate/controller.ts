import { Request, Response } from 'express';
import { branches } from './services';
import logger from '../../common/logger';

class DbController {
  public async populate(req: Request, res: Response): Promise<Response> {
    try {
      const result = await branches();
      return res.status(201).json(result);
    } catch (error) {
      logger.error('Error populating DB:', error);
      return res.status(500).json();
    }
  }
}

export default new DbController();
