import { Router } from 'express';

import BranchController from './controller';

const router = Router();

router.get('/', BranchController.getAll);

export default router;
