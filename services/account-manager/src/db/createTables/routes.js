'use strict';

const express = require('express');

const router = express.Router();

const createTables = require('./controller');

router.post('/', async (req, res, next) => {
  try {
    await createTables();
    return res.status(200).json('OK');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
