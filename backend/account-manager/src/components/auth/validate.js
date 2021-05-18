const joi = require('joi');
const logger = require('../../common/logger');
const { BadRequestError } = require('../../common/errors');

const verify = async (req, res, next) => {
  const schema = joi.string().required();

  const token = req.headers.authorization.split(' ')[1];

  try {
    await schema.validateAsync(token);
    return next();
  } catch (error) {
    logger.error(error);
    const { status, message } = BadRequestError();
    return res.status(status).json(message);
  }
};

const login = async ({ body }, res, next) => {
  const schema = joi.object().keys({
    branch: joi.string().required(),
    account: joi.string().required(),
    password: joi.string().required(),
  });

  try {
    await schema.validateAsync(body);
    return next();
  } catch (error) {
    const { status, message } = BadRequestError();
    return res.status(status).json(message);
  }
};

module.exports = {
  login,
  verify,
};
