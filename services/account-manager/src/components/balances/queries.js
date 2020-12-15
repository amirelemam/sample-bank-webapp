'use strict';

const knex = require('../../db');

const update = async (params, accountId) => {
  return knex('balances')
    .where('account_id', accountId)
    .andWhere('deleted_at', null)
    .update(params)
    .returning(['total', 'reserved', 'unreserved']);
};

const getBalance = (accountId) => {
  return knex
    .select('*')
    .from('balances')
    .where('account_id', accountId)
    .andWhere('deleted_at', null)
    .first();
};

module.exports = {
  update,

  getBalance,
};
