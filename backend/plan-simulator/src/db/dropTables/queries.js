const knex = require('../index');

const plans = () => knex.schema.dropTableIfExists('plans');

const features = () => knex.schema.dropTableIfExists('features');

const plansFeatures = () => knex.schema.dropTableIfExists('plans_features');

module.exports = {
  plans,
  features,
  plansFeatures,
};
