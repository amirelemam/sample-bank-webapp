const express = require('express');
const { NotFoundError } = require('../common/errors');

const healthCheck = require('./components/health/routes');

const router = express.Router();

router.use('/health', healthCheck);

// eslint-disable-next-line no-unused-vars
router.use('*', (req, res, next) => {
  if (req.url === '/') return next();
  next(NotFoundError());
});

module.exports = router;
