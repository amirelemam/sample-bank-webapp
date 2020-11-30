'use strict';

const router = require('express').Router();

const dropTables = require('./controller');

router.post('/', async (req, res, next) => {
  try {
    await dropTables();
    return res.status(200).json('OK');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
