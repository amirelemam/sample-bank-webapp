const joi = require('@hapi/joi');
const logger = require('../../common/logger');

const reserve = async (body) => {
  const schema = joi.object().keys({
    clientId: joi.string().uuid().required(),
    branch: joi.string().required(),
    account: joi.string().required(),
    ammount: joi.number().required(),
  });

  try {
    await schema.validateAsync(body);
    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

module.exports = {
  reserve,
};
