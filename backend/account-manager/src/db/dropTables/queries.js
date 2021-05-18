const knex = require('../index');

const clients = () => knex.schema.dropTableIfExists('clients');

const accounts = () => knex.schema.dropTableIfExists('accounts');

const balances = () => knex.schema.dropTableIfExists('balances');

const auth = () => knex.schema.dropTableIfExists('auth');

module.exports = {
  clients,
  accounts,
  balances,
  auth,
};
