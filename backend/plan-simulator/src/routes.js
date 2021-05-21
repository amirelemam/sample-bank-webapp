const express = require('express');

const healthCheck = require('./components/health/routes');
const createTables = require('./db/createTables/routes');
const dropTables = require('./db/dropTables/routes');
const populateTables = require('./db/populateTables/routes');
const plans = require('./components/plans/routes');
const features = require('./components/features/routes');
const { isDev, isTest } = require('./common/utils');

const router = express.Router();

router.use('/health', healthCheck);
router.use('/features', features);
router.use('/plans', plans);

/* istanbul ignore next */
if (isDev() || isTest()) {
  // DB
  router.use('/create-tables', createTables);
  router.use('/drop-tables', dropTables);
  router.use('/populate-tables', populateTables);
}

// eslint-disable-next-line no-unused-vars
router.use('*', (req, res, next) => next());

module.exports = router;
