const router = require('express').Router();
const packageJson = require('../../../package.json');

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  return res.status(200).json({
    message: "I'm alive!",
    version: packageJson.version,
  });
});

module.exports = router;
