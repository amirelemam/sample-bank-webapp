const knex = require('knex');
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

const db = knex({
  client: 'pg',
  version: '8.5',
  connection,
  pool: {
    min: 2,
    max: 10,
  },
});

db
  .raw('SELECT 1')
  .then(() => logger.info({ message: 'Successfully connected to DB' }))
  .catch((error) => logger.error({ message: 'Could not connect to DB', error }));

module.exports = knex;
