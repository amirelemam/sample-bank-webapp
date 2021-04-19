const knex = require('../index');

const plans = () => {
  return knex.schema.dropTableIfExists('plans');
};

const features = () => {
  return knex.schema.dropTableIfExists('features');
};

const plansFeatures = () => {
  return knex.schema.dropTableIfExists('plans_features');
};

module.exports = {
  plans,
  features,
  plansFeatures,
};
