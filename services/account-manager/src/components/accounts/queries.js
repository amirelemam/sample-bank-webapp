'use strict';

const knex = require('../../db');
const { InternalServerError } = require('../../common/errors');

const getAccount = ({ account, branch }) => {
  return knex
    .select(['branch', 'account_number', 'client_id', 'id'])
    .from('accounts')
    .where('account_number', account)
    .andWhere('branch', branch)
    .andWhere('deleted_at', null)
    .first();
};

const update = async (params, accountId) => {
  return knex('balances')
    .where('account_id', accountId)
    .andWhere('deleted_at', null)
    .update(params)
    .returning(['balance']);
};

const getBalance = (accountId) => {
  return knex
    .select('balance')
    .from('balances')
    .where('account_id', accountId)
    .andWhere('deleted_at', null)
    .first();
};

module.exports = {
  getAccount,
  getBalance,
  update,
};
