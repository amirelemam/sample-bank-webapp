const repository = require('./repository');

const getAll = async () => {
  const plans = await repository.getAll();

  const result = {};

  for (let i = 0; i < plans.length; i += 1) {
    const plan = plans[i];

    if (!result[plan.planId]) {
      result[plan.planId] = {};
      result[plan.planId].id = plan.planId;
      result[plan.planId].name = plan.planName;
      result[plan.planId].features = [];
      if (plan.featureQuantity === null) result[plan.planId].features.push({ id: plan.featureId, label: `No ${plan.featureName}` });
      else result[plan.planId].features.push({ id: plan.featureId, label: `${plan.featureQuantity} ${plan.featureName}` });
    } else if (plan.featureQuantity === null) result[plan.planId].features.push({ id: plan.featureId, label: `No ${plan.featureName}` });
    else { result[plan.planId].features.push({ id: plan.featureId, label: `${plan.featureQuantity} ${plan.featureName}` }); }
  }

  return result;
};

const calculateCost = async (features, featuresWithPlans) => {
  let { price: costBasic } = await repository.getPrice('basic');
  let { price: costPro } = await repository.getPrice('pro');

  for (let i = 0; i < features.length; i += 1) {
    const feature = features[i];
    let extraPro;
    let extraBasic;

    if (featuresWithPlans[feature.id].pro === null) extraPro = 0;
    else extraPro = featuresWithPlans[feature.id].pro - feature.quantity;

    if (featuresWithPlans[feature.id].basic === null) extraBasic = 0;
    else extraBasic = featuresWithPlans[feature.id].basic - feature.quantity;

    const term = featuresWithPlans[feature.id].priceType === 'year' ? 12 : 1;

    if (extraPro < 0) costPro += (Math.abs(extraPro) * featuresWithPlans[feature.id].price) / term;
    if (extraBasic < 0) {
      costBasic += (Math.abs(extraBasic) * featuresWithPlans[feature.id].price) / term;
    }
  }

  // limit to 2 floating points
  costBasic = parseFloat(costBasic.toFixed(2));
  costPro = parseFloat(costPro.toFixed(2));

  return { costBasic, costPro };
};

const selectBestPlan = ({ costBasic, costPro }) => {
  const basic = {
    cost: costBasic,
    plan: 'basic',
  };

  const pro = {
    cost: costPro,
    plan: 'pro',
  };

  if (costBasic < costPro) return { cheaper: basic, expensive: pro };
  return { cheaper: pro, expensive: basic };
};

module.exports = {
  getAll,
  calculateCost,
  selectBestPlan,
};
