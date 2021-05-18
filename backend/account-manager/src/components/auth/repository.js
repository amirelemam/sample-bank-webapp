const knex = require('../../db');

const getAccountCredentials = ({ account, branch }) => knex
  .select(['password', 'salt'])
  .from('auth')
  .where('account', account)
  .andWhere('branch', branch)
  .andWhere('deleted_at', null)
  .first();

module.exports = {
  getAccountCredentials,
};
