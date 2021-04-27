const services = require('./services');

const getAll = async () => {
  const result = await services.getAll();
  return Object.keys(result).map((item) => result[item]);
};

const selectBestPlan = (features) => services.selectBestPlan(features);

module.exports = {
  getAll,
  selectBestPlan,
};
