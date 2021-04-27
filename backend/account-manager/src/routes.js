const express = require('express');

const healthCheck = require('./components/health/routes');
const createTables = require('./db/createTables/routes');
const dropTables = require('./db/dropTables/routes');
const populateTables = require('./db/populateTables/routes');
const accounts = require('./components/accounts/routes');
const { isDev, isTest } = require('./common/utils');

const router = express.Router();

// Application
router.use('/health', healthCheck);
router.use('/accounts', accounts);

// DB
if (isDev() || isTest()) {
  router.use('/create-tables', createTables);
  router.use('/drop-tables', dropTables);
  router.use('/populate-tables', populateTables);
}

// eslint-disable-next-line no-unused-vars
router.use('*', (req, res, next) => next());

module.exports = router;
