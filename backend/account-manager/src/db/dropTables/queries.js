const knex = require('../index');

const clients = () => knex.schema.dropTableIfExists('clients');

const accounts = () => knex.schema.dropTableIfExists('accounts');

const balances = () => knex.schema.dropTableIfExists('balances');

module.exports = {
  clients,
  accounts,
  balances,
};
