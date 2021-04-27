const joi = require('joi');
const logger = require('../../common/logger');

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
    return res.status(400).send();
  }
};

module.exports = {
  bestPlan,
};
