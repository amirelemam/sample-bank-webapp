'use strict';

const joi = require('@hapi/joi');
const logger = require('../../common/logger');
const { SAVINGS, CHECKING } = require('../../common/enums/accountTypes');

const deposit = async (body) => {
  const schema = joi.object().keys({
    branch: joi.string().required(),
    account: joi.string().required(),
    type: joi.string().valid(SAVINGS, CHECKING).required(),
    amount: joi.number().required(),
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
    branch: joi.string().required(),
    account: joi.string().required(),
    type: joi.string().valid(SAVINGS, CHECKING).required(),
    amount: joi.number().required(),
  });

  try {
    await schema.validateAsync(body);
    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

const transfer = async (body) => {
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
    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

module.exports = {
  deposit,
  withdraw,
  transfer,
};
