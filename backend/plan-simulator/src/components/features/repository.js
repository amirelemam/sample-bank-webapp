const knex = require('../../db');

const getAll = () => knex
  .select(['id', 'name', 'price', knex.raw('price_type as priceType')])
  .from('features')
  .where('deleted_at', null);

const getAllWithPlans = () => knex
  .select([
    knex.raw('features.id as id'),
    knex.raw('features.price as price'),
    knex.raw('features.name as name'),
    knex.raw('features.price_type as "priceType"'),
    knex.raw('plans_features.quantity as quantity'),
    knex.raw('plans.name as plan'),
  ])
  .from('features')
  .where('features.deleted_at', null)
  .leftJoin('plans_features', 'features.id', 'plans_features.feature_id')
  .innerJoin('plans', 'plans_features.plan_id', '=', 'plans.id');

module.exports = {
  getAll,
  getAllWithPlans,
};
