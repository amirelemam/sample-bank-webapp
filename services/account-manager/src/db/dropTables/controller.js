'use strict';

const dropTables = require('./queries');

module.exports = async () => {
  await dropTables.balances();
  await dropTables.accounts();
  await dropTables.clients();
};
