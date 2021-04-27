const knex = require('../index');
const { CHECKING, SAVINGS } = require('../../common/enums/accountTypes');

const clients = () => knex
  .insert({
    id: '38c3de93-874d-444c-b83f-11e89cca252b',
    name: 'John',
    surname: 'Doe',
    tax_id: '078-05-1120',
  })
  .into('clients')
  .returning('*');

const accounts = () => {
  const rows = [
    {
      id: '4cd84b0d-4673-4261-bf43-50095919eeb0',
      branch: '0001',
      account_number: '12345',
      type: CHECKING,
      client_id: '38c3de93-874d-444c-b83f-11e89cca252b',
    },
    {
      id: '5cd84b0d-4673-4261-bf43-50095919eeb0',
      branch: '0001',
      account_number: '12345',
      type: SAVINGS,
      client_id: '38c3de93-874d-444c-b83f-11e89cca252b',
    },
    {
      id: '6cd84b0d-4673-4261-bf43-50095919eeb0',
      branch: '0001',
      account_number: '24680',
      type: CHECKING,
      client_id: '38c3de93-874d-444c-b83f-11e89cca252b',
    },
  ];

  return knex.batchInsert('accounts', rows).returning('*');
};

const balances = () => {
  const rows = [
    {
      id: 'f4c35ce9-8d1f-4224-908d-ab079ab06802',
      balance: 1100,
      account_id: '4cd84b0d-4673-4261-bf43-50095919eeb0',
    },
    {
      id: 'f5c35ce9-8d1f-4224-908d-ab079ab06802',
      balance: 300,
      account_id: '5cd84b0d-4673-4261-bf43-50095919eeb0',
    },
    {
      id: 'f6c35ce9-8d1f-4224-908d-ab079ab06802',
      balance: 999000,
      account_id: '6cd84b0d-4673-4261-bf43-50095919eeb0',
    },
  ];

  return knex.batchInsert('balances', rows).returning('*');
};

module.exports = {
  clients,
  accounts,
  balances,
};
