const router = require('express').Router();
const validation = require('./validation');
const controller = require('./controller');
const { verifyToken } = require('../auth/middlewares');

router.get(
  '/balance',
  verifyToken,
  validation.getBalance,
  async (req, res, next) => {
    try {
      const { branch, account, accountType } = req.query;

      const result = await controller.getBalance({ account, branch, accountType });

      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  },
);

router.post(
  '/transfer',
  verifyToken,
  validation.transfer,
  async (req, res, next) => {
    try {
      const { amount, origin, destiny } = req.body;

      const result = await controller.transfer({
        amount,
        origin,
        destiny,
      });

      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  },
);

module.exports = router;
