const router = require('express').Router();
const validate = require('./validate');
const controller = require('./controller');
const { verifyToken } = require('./middlewares');

router.post(
  '/login',
  validate.login,
  async (req, res, next) => {
    try {
      const {
        branch, account, password,
      } = req.body;

      const token = await controller.validateLogin({
        account, branch, password,
      });

      return res.status(200).send({
        'access-token': token,
      });
    } catch (err) {
      return next(err);
    }
  },
);

router.post(
  '/verify',
  validate.verify,
  verifyToken,
  async (req, res, next) => {
    try {
      return res.status(200).send();
    } catch (err) {
      return next(err);
    }
  },
);

module.exports = router;
