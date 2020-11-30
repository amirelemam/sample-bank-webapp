'use strict';

const connection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
};

if (process.env.NODE_ENV === 'test') {
  connection.database = 'postgres';
}

const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection,
  pool: { min: 0, max: 7 },
});

module.exports = knex;
