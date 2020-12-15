'use strict';

const knex = require('../../db');

const getAccount = ({ clientId, account, branch }) => {
  try {
    return knex
      .select('*')
      .from('accounts')
      .where('account_number', account)
      .andWhere('branch', branch)
      .andWhere('client_id', clientId)
      .andWhere('deleted_at', null)
      .first();
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAccount,
};
