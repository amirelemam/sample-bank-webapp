const { UnauthenticatedError } = require('../../common/errors');
const services = require('./services');
const { isDev, isTest } = require('../../common/utils');

const verifyToken = async (req, res, next) => {
  try {
    if (isDev() || isTest()) return next();

    const token = req.headers.authorization.split(' ')[1];

    const result = await services.verifyToken(token);

    if (!result) throw UnauthenticatedError();

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  verifyToken,
};
