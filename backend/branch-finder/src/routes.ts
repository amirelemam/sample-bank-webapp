import { Router } from 'express';
import branches from './components/branches/routes';
import dbPopulate from './db/populate/routes';
import dbDrop from './db/drop/routes';
import { isDev, isTest } from './common/utils';

const routes = Router();

routes.use('/branches', branches);

if (isTest() || isDev()) {
  routes.use('/db/populate', dbPopulate);
  routes.use('/db/drop', dbDrop);
}

export default routes;
