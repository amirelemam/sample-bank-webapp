const router = require('express').Router();
const validation = require('./validation');
const authentication = require('../../common/middlewares/authentication');
const controller = require('./controller');

router.get(
  '/balance',
  authentication,
  validation.getBalance,
  async (req, res, next) => {
    try {
      const { branch, account, type } = req.query;

      const result = await controller.getBalance({ account, branch, type });

      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  },
);

router.post(
  '/transfer',
  authentication,
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
