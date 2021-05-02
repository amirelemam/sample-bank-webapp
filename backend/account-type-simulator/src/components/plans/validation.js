const joi = require('joi');
const logger = require('../../common/logger');
const { BadRequestError } = require('../../common/errors');

const bestPlan = async ({ body }, res, next) => {
  const schema = joi.array().items(
    joi.object().keys({
      id: joi.string().uuid().required(),
      quantity: joi.number().required(),
    }),
  );

  try {
    await schema.validateAsync(body);
    return next();
  } catch (error) {
    logger.error(error);
    const { status, message } = BadRequestError();
    return res.status(status).json(message);
  }
};

module.exports = {
  bestPlan,
};
