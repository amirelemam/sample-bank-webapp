'use strict';

const joi = require('joi');
const logger = require('../../common/logger');
const { SAVINGS, CHECKING } = require('../../common/enums/accountTypes');

const deposit = async ({ body }, res, next) => {
  const schema = joi.object().keys({
    branch: joi.string().required(),
    account: joi.string().required(),
    type: joi.string().valid(SAVINGS, CHECKING).required(),
    amount: joi.number().required(),
  });

  try {
    await schema.validateAsync(body);
    return next();
  } catch (error) {
    logger.error(error);
    return res.status(400).send();
  }
};

const withdraw = async ({ body }, res, next) => {
  const schema = joi.object().keys({
    branch: joi.string().required(),
    account: joi.string().required(),
    type: joi.string().valid(SAVINGS, CHECKING).required(),
    amount: joi.number().required(),
  });

  try {
    await schema.validateAsync(body);
    return next();
  } catch (error) {
    logger.error(error);
    return res.status(400).send();
  }
};

const transfer = async ({ body }, res, next) => {
  const schema = joi.object().keys({
    origin: joi.object().keys({
      branch: joi.string().required(),
      account: joi.string().required(),
      type: joi.string().valid(SAVINGS, CHECKING).required(),
    }),
    destiny: joi.object().keys({
      branch: joi.string().required(),
      account: joi.string().required(),
      type: joi.string().valid(SAVINGS, CHECKING).required(),
    }),
    amount: joi.number().required(),
  });

  try {
    await schema.validateAsync(body);
    return next();
  } catch (error) {
    logger.error(error);
    return res.status(400).send();
  }
};

module.exports = {
  deposit,
  withdraw,
  transfer,
};
