const knex = require('../../db');

const getAll = () => knex
  .select([
    knex.raw('features.id as "featureId"'),
    knex.raw('features.name as "featureName"'),
    knex.raw('plans_features.quantity as "featureQuantity"'),
    knex.raw('plans.id as "planId"'),
    knex.raw('plans.name as "planName"'),
  ])
  .from('features')
  .where('features.deleted_at', null)
  .leftJoin('plans_features', 'features.id', 'plans_features.feature_id')
  .where('plans_features.quantity', '>', 0)
  .orWhere('plans_features.quantity', null)
  .innerJoin('plans', 'plans_features.plan_id', '=', 'plans.id');

const getPrice = (planName) => knex
  .select('price')
  .from('plans')
  .where('name', planName)
  .andWhere('deleted_at', null)
  .first();

module.exports = {
  getAll,
  getPrice,
};
