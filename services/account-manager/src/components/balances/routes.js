'use strict';

const router = require('express').Router();
const logger = require('../../common/logger');
const validation = require('./validation');
const { BadRequestError } = require('../../../../common/errors');

const controller = require('./controller');

router.get('/branch/:branch/account/:account/', async (req, res, next) => {
  try {
    const { branch, account } = req.params;
    const { userId } = req.body;

    const result = controller.getAccount({ userId, account, branch });

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

router.post('/reserve', async (req, res, next) => {
  try {
    const { body } = req;

    const isValid = await validation.reserve(body);

    if (!isValid) throw BadRequestError();

    const { clientId, ammount, account, branch } = body;

    const result = await controller.reserve({
      clientId,
      account,
      branch,
      ammount,
    });

    if (result) return res.status(200).json(result);
    return res.status(500).json();
  } catch (err) {
    return next(err);
  }
});

router.post('/unreserve', async (req, res, next) => {
  try {
    const { userId, ammount, account, branch } = req.body;

    const result = controller.unreserve({ userId, account, branch, ammount });

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
