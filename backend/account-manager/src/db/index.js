'use strict';

const logger = require('../common/logger');

let connection;

if (process.env.DB_CONN_STR) {
  connection = process.env.DB_CONN_STR;
} else {
  connection = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'postgres',
  };
}

const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection,
  pool: {
    min: 2,
    max: 10,
    afterCreate: () => {
      logger.info('Successfully connected to DB.');
    },
  },
});

module.exports = knex;
