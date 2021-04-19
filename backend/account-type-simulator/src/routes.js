const express = require('express');
const { NotFoundError } = require('./common/errors');

const healthCheck = require('./components/health/routes');
const createTables = require('./db/createTables/routes');
const dropTables = require('./db/dropTables/routes');
const populateTables = require('./db/populateTables/routes');
const plans = require('./components/plans/routes');
const { isDev, isTest } = require('./common/utils');

const router = express.Router();

// Application
router.use('/health', healthCheck);
router.use('/plans', plans);

// DB
if (isDev() || isTest()) {
  router.use('/create-tables', createTables);
  router.use('/drop-tables', dropTables);
  router.use('/populate-tables', populateTables);
}

// eslint-disable-next-line no-unused-vars
router.use('*', (req, res, next) => {
  if (req.url === '/') return next();
  next(NotFoundError());
});

module.exports = router;