const plans = require('./plans');

module.exports = {
  openapi: '3.0.1',
  info: {
    title: 'Account Type Simulator',
    version: '1.0.0',
    description: 'This service simulates which is the best account type',
    contact: {
      name: 'Amir Elemam',
    },
    license: {
      name: 'MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
  },
  basePath: '/api/v1',
  components: {
    schemas: {},
    securitySchemes: {},
  },
  paths: {
    '/api/v1/plans': {
      get: plans.getAll,
    },
    '/api/v1/plans/best-plan': {
      post: plans.selectBestPlan,
    },
  },
};
