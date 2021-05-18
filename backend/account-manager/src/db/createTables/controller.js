const createTables = require('./queries');

module.exports = async () => {
  await createTables.loadDependencies();
  await createTables.clients();
  await createTables.accounts();
  await createTables.balances();
  await createTables.auth();
};
