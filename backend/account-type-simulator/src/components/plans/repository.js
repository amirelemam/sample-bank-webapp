const knex = require('../../db');

const getAll = () => {
  return knex
    .select([
      'features.id',
      'features.name',
      'features.price',
      'features.price_type',
      'plans_features.quantity',
      'features.name',
      knex.raw('plans.name as plan'),
    ])
    .from('features')
    .where('features.deleted_at', null)
    .leftJoin('plans_features', 'features.id', 'plans_features.feature_id')
    .innerJoin('plans', 'plans_features.plan_id', '=', 'plans.id');
};

module.exports = {
  getAll,
};
