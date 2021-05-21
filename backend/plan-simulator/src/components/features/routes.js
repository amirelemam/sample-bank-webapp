const router = require('express').Router();
const controller = require('./controller');

router.get('/', async (req, res, next) => {
  try {
    const result = await controller.getAll();

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
