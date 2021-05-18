const router = require('express').Router();

const populateTables = require('./controller');

// eslint-disable-next-line no-unused-vars
router.post('/', async (req, res, next) => {
  try {
    await populateTables.all();

    return res.status(200).json('OK');
  } catch (err) {
    return next(err);
  }
});

// eslint-disable-next-line no-unused-vars
router.post('/clients', async (req, res, next) => {
  try {
    await populateTables.clients();

    return res.status(200).json('OK');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
