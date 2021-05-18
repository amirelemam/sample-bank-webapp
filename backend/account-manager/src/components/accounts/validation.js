const joi = require('joi');
const logger = require('../../common/logger');
const { BadRequestError } = require('../../common/errors');
const { SAVINGS, CHECKING } = require('../../common/enums/accountTypes');

const transfer = async ({ body }, res, next) => {
  const schema = joi.object().keys({
    origin: joi.object().keys({
      branch: joi.string().required(),
      account: joi.string().required(),
      accountType: joi.string().valid(SAVINGS, CHECKING).required(),
    }),
    destiny: joi.object().keys({
      branch: joi.string().required(),
      account: joi.string().required(),
      accountType: joi.string().valid(SAVINGS, CHECKING).required(),
    }),
    amount: joi.number().required(),
  });

  try {
    await schema.validateAsync(body);
    return next();
  } catch (error) {
    logger.error(error);
    const { status, message } = BadRequestError();
    return res.status(status).json(message);
  }
};

const getBalance = async ({ query }, res, next) => {
  const schema = joi.object().keys({
    branch: joi.string().required(),
    account: joi.string().required(),
    accountType: joi.string().valid(SAVINGS, CHECKING).required(),
  });

  try {
    await schema.validateAsync(query);
    return next();
  } catch (error) {
    const { status, message } = BadRequestError();
    return res.status(status).json(message);
  }
};

module.exports = {
  transfer,
  getBalance,
};
