const dropTables = require('./queries');

module.exports = async () => {
  await dropTables.plansFeatures();
  await dropTables.plans();
  await dropTables.features();
};
