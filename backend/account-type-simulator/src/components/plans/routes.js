const router = require('express').Router();
const controller = require('./controller');
const validation = require("./validation")

router.get('/', async (req, res, next) => {
  try {
    const result = await controller.getAll();

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

router.post('/best-plan', validation.bestPlan, async (req, res, next) => {
  try {
    const result = await controller.selectBestPlan(req.body);

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
