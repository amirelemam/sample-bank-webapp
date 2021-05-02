import { Router } from 'express';
import healthCheck from './components/health/routes';
import branches from './components/branches/routes';
import dbPopulate from './db/populate/routes';
import dbDrop from './db/drop/routes';
import { isDev, isTest } from './common/utils';

const router = Router();

router.use('/health', healthCheck);
router.use('/branches', branches);

if (isTest() || isDev()) {
  router.use('/db/populate', dbPopulate);
  router.use('/db/drop', dbDrop);
}

export default router;
