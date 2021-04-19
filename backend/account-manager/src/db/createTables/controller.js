const createTables = require('./queries');
const populateTables = require('../populateTables/controller');

module.exports = async () => {
  await createTables.loadDependencies();
  await createTables.clients();
  await createTables.accounts();
  await createTables.balances();
};
