const populateTables = require('./queries');

const all = async () => {
  await populateTables.plans();
  await populateTables.features();
  await populateTables.plansFeatures();
};

const plans = async () => {
  await populateTables.plans();
};

const features = async () => {
  await populateTables.features();
};

const plansFeatures = async () => {
  await populateTables.plansFeatures();
};

module.exports = {
  all,
  plans,
  features,
  plansFeatures,
};
