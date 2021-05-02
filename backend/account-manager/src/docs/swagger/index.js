const accounts = require('./accounts');

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Account Manager',
    version: '1.0.0',
    description: 'This service allows you to manage your bank account',
    contact: {
      name: 'Amir Elemam',
    },
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
  },
  basePath: '/api/v1',
  components: {
    schemas: {},
    securitySchemes: {},
  },
  paths: {
    '/api/v1/accounts/transfer': {
      post: accounts.transfer,
    },
    '/api/v1/accounts/balance': {
      get: accounts.getBalance,
    },
  },
};
