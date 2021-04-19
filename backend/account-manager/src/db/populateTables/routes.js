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

router.post('/clients', async (req, res, next) => {
  try {
    await populateTables.clients();

    return res.status(200).json('OK');
  } catch (err) {
    return next(err);
  }
});

router.post('/accounts', async (req, res, next) => {
  try {
    await populateTables.accounts();

    return res.status(200).json('OK');
  } catch (err) {
    return next(err);
  }
});

router.post('/balances', async (req, res, next) => {
  try {
    await populateTables.balances();

    return res.status(200).json('OK');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
