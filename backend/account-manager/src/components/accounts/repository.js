const knex = require('../../db');

const getAccount = ({ account, branch, accountType }) => knex
  .select(['branch', 'account_number', 'client_id', 'id'])
  .from('accounts')
  .where('account_number', account)
  .andWhere('branch', branch)
  .andWhere('account_type', accountType)
  .andWhere('deleted_at', null)
  .first();

module.exports = {
  getAccount,
};
