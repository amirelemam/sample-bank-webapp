const repository = require('./repository');

const getAll = async () => {
  const features = await repository.getAll();

  const result = {};

  for (let i = 0; i < features.length; i += 1) {
    const feature = features[i];

    if (!result[feature.id]) {
      result[feature.id] = {};
      result[feature.id].id = feature.id;
      result[feature.id].name = feature.name;
      result[feature.id].price = feature.price;
      result[feature.id].extra = `$${feature.price}/${feature.price_type}`;
      result[feature.id][feature.plan] = feature.quantity;
    } else result[feature.id][feature.plan] = feature.quantity;
  }

  return result;
};

const calculateCost = async (features, featuresWithPlans) => {
  let costFree = 0;
  let costPro = await repository.getCost('pro');

  for (let i = 0; i < features.length; i += 1) {
    const feature = features[i];
    const extraPro = featuresWithPlans[feature.id].pro - feature.quantity;
    const extraFree = featuresWithPlans[feature.id].free - feature.quantity;

    if (extraPro < 0) { costPro += Math.abs(extraPro) * featuresWithPlans[feature.id].price; }
    if (extraFree < 0) { costFree += Math.abs(extraFree) * featuresWithPlans[feature.id].price; }
  }

  return { costFree, costPro };
};

const selectBestPlan = async (features) => {
  const featuresWithPlans = await module.exports.getAll();

  const { costFree, costPro } = await module.exports.calculateCost(features, featuresWithPlans);

  const free = {
    cost: costFree,
    plan: 'free',
  };

  const pro = {
    cost: costPro,
    plan: 'pro',
  };

  if (costFree < costPro) return { cheaper: free, expensive: pro };
  return { cheaper: pro, expensive: free };
};

module.exports = {
  getAll,
  selectBestPlan,
  calculateCost,
};
