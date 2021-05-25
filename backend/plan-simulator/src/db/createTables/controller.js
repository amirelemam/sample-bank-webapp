const createTables = require('./queries');
const { testDBConnection } = require('../../common/utils');

module.exports = async () => {
  await testDBConnection();
  await createTables.loadDependencies();
  await createTables.plans();
  await createTables.features();
  await createTables.plansFeatures();
};
