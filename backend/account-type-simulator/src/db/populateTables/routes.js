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

router.post('/plans', async (req, res, next) => {
  try {
    await populateTables.plans();

    return res.status(200).json('OK');
  } catch (err) {
    return next(err);
  }
});

router.post('/features', async (req, res, next) => {
  try {
    await populateTables.features();

    return res.status(200).json('OK');
  } catch (err) {
    return next(err);
  }
});

router.post('/plans-features', async (req, res, next) => {
  try {
    await populateTables.plansFeatures();

    return res.status(200).json('OK');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
