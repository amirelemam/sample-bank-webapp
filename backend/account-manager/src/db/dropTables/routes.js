'use strict';

const router = require('express').Router();

const dropTables = require('./controller');

// eslint-disable-next-line no-unused-vars
router.post('/', async (req, res, next) => {
  try {
    await dropTables();
    return res.status(200).json('OK');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
