const populateTables = require('./queries');

const all = async () => {
  await populateTables.plans();
  await populateTables.features();
  await populateTables.plansFeatures();
};

module.exports = {
  all,
};
