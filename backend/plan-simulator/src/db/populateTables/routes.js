const router = require('express').Router();

const populateTables = require('./controller');

router.post('/', async (req, res, next) => {
  try {
    await populateTables.all();

    return res.status(200).json('OK');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
