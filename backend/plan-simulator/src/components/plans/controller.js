const services = require('./services');
const featureService = require('../features/services');

const getAll = async () => {
  const result = await services.getAll();
  return Object.keys(result).map((item) => result[item]);
};

const selectBestPlan = async (features) => {
  const featuresWithPlans = await featureService.getAllWithPlans();

  const { costBasic, costPro } = await services
    .calculateCost(features, featuresWithPlans);

  return services.selectBestPlan({ costBasic, costPro });
};

module.exports = {
  getAll,
  selectBestPlan,
};
