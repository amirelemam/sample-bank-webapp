const createTables = require('./queries');
const { testDBConnection } = require('../../common/utils');

module.exports = async () => {
  await testDBConnection();
  await createTables.loadDependencies();
  await createTables.clients();
  await createTables.accounts();
  await createTables.balances();
  await createTables.auth();
};
