const joi = require('@hapi/joi');
const logger = require('../../common/logger');

const deposit = async (body) => {
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

const withdraw = async (body) => {
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

const getBalance = async (req) => {
  const schema = joi.string().uuid().required();

  const clientId = req.get('clientId');

  try {
    await schema.validateAsync(clientId);
    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

module.exports = {
  deposit,
  withdraw,
  getBalance,
};
