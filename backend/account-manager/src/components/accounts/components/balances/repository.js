const knex = require('../../../../db');

const update = async (params, accountId) => knex('balances')
  .where('account_id', accountId)
  .andWhere('deleted_at', null)
  .update(params)
  .returning('*');

const getBalance = (accountId) => knex
  .select('balance')
  .from('balances')
  .where('account_id', accountId)
  .andWhere('deleted_at', null)
  .first();

module.exports = {
  getBalance,
  update,
};
