const createTables = require('./queries');

module.exports = async () => {
  await createTables.loadDependencies();
  await createTables.plans();
  await createTables.features();
  await createTables.plansFeatures();
};
