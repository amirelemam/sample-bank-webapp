'use strict';

const knex = require('../index');

const clients = () => {
  return knex
    .insert({
      id: '38c3de93-874d-444c-b83f-11e89cca252b',
      name: 'John',
      surname: 'Doe',
      tax_id: '078-05-1120',
    })
    .into('clients')
    .returning('*');
};

const accounts = () => {
  return knex
    .insert({
      id: '4cd84b0d-4673-4261-bf43-50095919eeb0',
      branch: '0001',
      account_number: '12345',
      client_id: '38c3de93-874d-444c-b83f-11e89cca252b',
    })
    .into('accounts')
    .returning('*');
};

const balances = () => {
  return knex
    .insert({
      id: 'f4c35ce9-8d1f-4224-908d-ab079ab06802',
      balance: 1100,
      account_id: '4cd84b0d-4673-4261-bf43-50095919eeb0',
    })
    .into('balances')
    .returning('*');
};

module.exports = {
  clients,
  accounts,
  balances,
};
