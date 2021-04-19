const knex = require('../index');

const clients = () => {
  return knex.schema.dropTableIfExists('clients');
};

const accounts = () => {
  return knex.schema.dropTableIfExists('accounts');
};

const balances = () => {
  return knex.schema.dropTableIfExists('balances');
};

module.exports = {
  clients,
  accounts,
  balances,
};
