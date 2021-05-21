const features = require('../../docs/swagger/features');
const repository = require('./repository');

const getAll = () => repository.getAll();

const getAllWithPlans = async () => {
  const featuresWithPlans = await repository.getAllWithPlans();

  const result = {};
  for (let i = 0; i < featuresWithPlans.length; i += 1) {
    const feature = featuresWithPlans[i];

    if (!result[feature.id]) {
      result[feature.id] = {};
      result[feature.id].name = feature.name;
      result[feature.id].price = feature.price;
      result[feature.id].priceType = feature.priceType;
      result[feature.id][feature.plan] = feature.quantity;
    } else result[feature.id][feature.plan] = feature.quantity;
  }

  return result;
};

module.exports = {
  getAll,
  getAllWithPlans,
};
