const router = require('express').Router();

const controller = require('./controller');

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  const msg = controller.isAlive();

  return res.status(200).json(msg);
});

module.exports = router;
