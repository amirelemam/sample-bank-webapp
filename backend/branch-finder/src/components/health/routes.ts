import express from 'express';

import controller from './controller';

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/', controller.isAlive);

export default router;
