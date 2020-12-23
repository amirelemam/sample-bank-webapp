'use strict';

const router = require('express').Router();
const validation = require('./validation');
const { BadRequestError } = require('../../../../common/errors');

const controller = require('./controller');

router.get(
  '/branch/:branch/account/:account/balance',
  async (req, res, next) => {
    try {
      const { branch, account } = req.params;

      const isValid = await validation.getBalance(req);

      if (!isValid) throw BadRequestError();

      const clientId = req.get('clientId');

      const result = await controller.getBalance({ clientId, account, branch });

      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  }
);

router.post('/deposit', async (req, res, next) => {
  try {
    const { body } = req;

    const isValid = await validation.deposit(body);

    if (!isValid) throw BadRequestError();

    const { clientId, amount, account, branch } = body;

    const result = await controller.deposit({
      clientId,
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

router.post('/withdraw', async (req, res, next) => {
  try {
    const { body } = req;

    const isValid = await validation.withdraw(body);

    if (!isValid) throw BadRequestError();

    const { clientId, amount, account, branch } = body;

    const result = await controller.withdraw({
      clientId,
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
