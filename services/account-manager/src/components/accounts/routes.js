'use strict';

const router = require('express').Router();
const validation = require('./validation');
const { BadRequestError } = require('../../../../common/errors');
const authentication = require('../../common/middlewares/authentication');

const controller = require('./controller');

router.get(
  '/branch/:branch/account/:account/balance',
  authentication,
  async (req, res, next) => {
    try {
      const { branch, account } = req.params;

      const result = await controller.getBalance({ account, branch });

      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  }
);

router.post('/deposit', authentication, async (req, res, next) => {
  try {
    const { body } = req;

    const isValid = await validation.deposit(body);

    if (!isValid) throw BadRequestError();

    const { amount, account, branch } = body;

    const result = await controller.deposit({
      account,
      branch,
      amount,
    });

    if (result) return res.status(200).json(result);
    return res.status(500).json();
  } catch (err) {
    return next(err);
  }
});

router.post('/withdraw', authentication, async (req, res, next) => {
  try {
    const { body } = req;

    const isValid = await validation.withdraw(body);

    if (!isValid) throw BadRequestError();

    const { amount, account, branch } = body;

    const result = await controller.withdraw({
      account,
      branch,
      amount,
    });

    if (result) return res.status(200).json(result);
    return res.status(500).json();
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
