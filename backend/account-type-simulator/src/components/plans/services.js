const repository = require('./repository');

const PLAN_PRO_MONTHLY_FEE = 10;

const getAll = async () => {
  const features = await repository.getAll();

  const result = {};

  for (let i = 0; i < features.length; i++) {
    const feature = features[i];

    if (!result[feature.id]) {
      result[feature.id] = {};
      result[feature.id].id = feature.id;
      result[feature.id].name = feature.name;
      result[feature.id].price = feature.price;
      result[feature.id].extra = `US$${feature.price}/${feature.price_type}`;
      result[feature.id][feature.plan] = feature.quantity;
    }
    result[feature.id][feature.plan] = feature.quantity;
  }

  return result;
};

const selectBestPlan = async (features) => {
  const featuresWithPlans = await getAll();

  const [costFree, costPro] = calculateCost(features, featuresWithPlans);

  const free = {
    cost: costFree,
    plan: 'free',
  };

  const pro = {
    cost: costPro,
    plan: 'pro',
  };

  let result;

  if (costFree < costPro) {
    result = { cheaper: free, expensive: pro };
  } else {
    result = { cheaper: pro, expensive: free };
  }

  return result;
};

const calculateCost = (features, featuresWithPlans) => {
  let costFree = 0;
  let costPro = PLAN_PRO_MONTHLY_FEE;

  for (let i = 0; i < features.length; i++) {
    const feature = features[i];
    const extraPro = featuresWithPlans[feature.id].pro - feature.quantity;
    const extraFree = featuresWithPlans[feature.id].free - feature.quantity;

    if (extraPro < 0)
      costPro += Math.abs(extraPro) * featuresWithPlans[feature.id].price;
    if (extraFree < 0)
      costFree += Math.abs(extraFree) * featuresWithPlans[feature.id].price;
  }

  return [costFree, costPro];
};

module.exports = {
  getAll,
  selectBestPlan,
  calculateCost,
};
