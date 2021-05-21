const knex = require('../index');

const plans = () => {
  const rows = [
    {
      id: '38c3de93-874d-444c-b83f-11e89cca252b',
      name: 'basic',
      price: 0,
    },
    {
      id: '48c3de93-874d-444c-b83f-11e89cca252b',
      name: 'pro',
      price: 10,
    },
  ];

  return knex.batchInsert('plans', rows).returning('*');
};

const plansFeatures = () => {
  const rows = [
    {
      id: '4cd84b0d-4673-4261-bf43-50095919eeb0',
      quantity: 1,
      feature_id: 'e4c35ce9-8d1f-4224-908d-ab079ab06802',
      plan_id: '38c3de93-874d-444c-b83f-11e89cca252b',
    },
    {
      id: '5cd84b0d-4673-4261-bf43-50095919eeb0',
      quantity: 0,
      feature_id: 'e5c35ce9-8d1f-4224-908d-ab079ab06802',
      plan_id: '38c3de93-874d-444c-b83f-11e89cca252b',
    },
    {
      id: '6cd84b0d-4673-4261-bf43-50095919eeb0',
      quantity: 1,
      feature_id: 'e6c35ce9-8d1f-4224-908d-ab079ab06802',
      plan_id: '38c3de93-874d-444c-b83f-11e89cca252b',
    },
    {
      id: '7cd84b0d-4673-4261-bf43-50095919eeb0',
      quantity: 0,
      feature_id: 'e7c35ce9-8d1f-4224-908d-ab079ab06802',
      plan_id: '38c3de93-874d-444c-b83f-11e89cca252b',
    },
    {
      id: '9cd84b0d-4673-4261-bf43-50095919eeb0',
      quantity: 5,
      feature_id: 'e4c35ce9-8d1f-4224-908d-ab079ab06802',
      plan_id: '48c3de93-874d-444c-b83f-11e89cca252b',
    },
    {
      id: '8cd84b0d-4673-4261-bf43-50095919eeb0',
      quantity: null,
      feature_id: 'e5c35ce9-8d1f-4224-908d-ab079ab06802',
      plan_id: '48c3de93-874d-444c-b83f-11e89cca252b',
    },
    {
      id: '0cd84b0d-4673-4261-bf43-50095919eeb0',
      quantity: 3,
      feature_id: 'e6c35ce9-8d1f-4224-908d-ab079ab06802',
      plan_id: '48c3de93-874d-444c-b83f-11e89cca252b',
    },
    {
      id: '1cd84b0d-4673-4261-bf43-50095919eeb0',
      quantity: 1,
      feature_id: 'e7c35ce9-8d1f-4224-908d-ab079ab06802',
      plan_id: '48c3de93-874d-444c-b83f-11e89cca252b',
    },
  ];

  return knex.batchInsert('plans_features', rows).returning('*');
};

const features = () => {
  const rows = [
    {
      id: 'e4c35ce9-8d1f-4224-908d-ab079ab06802',
      name: 'Wire Transfer',
      price: 5,
      price_type: 'each',
    },
    {
      id: 'e5c35ce9-8d1f-4224-908d-ab079ab06802',
      name: 'Credit Card Fee',
      price: 50,
      price_type: 'year',
    },
    {
      id: 'e6c35ce9-8d1f-4224-908d-ab079ab06802',
      name: 'ATM Withdrawal (our network)',
      price: 2,
      price_type: 'each',
    },
    {
      id: 'e7c35ce9-8d1f-4224-908d-ab079ab06802',
      name: 'ATM Withdrawal (other banks)',
      price: 3,
      price_type: 'each',
    },
  ];

  return knex.batchInsert('features', rows).returning('*');
};

module.exports = {
  features,
  plans,
  plansFeatures,
};
