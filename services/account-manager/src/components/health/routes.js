'use strict';

const router = require('express').Router();
const logger = require('../../common/logger');

const controller = require('./controller');

router.get('/', (req, res, next) => {
  const msg = controller.isAlive();

  return res.status(200).json(msg);
});

module.exports = router;
