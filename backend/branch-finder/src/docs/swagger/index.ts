import branches from './branches';

export default {
  openapi: '3.0.1',
  info: {
    title: 'Branch Finder',
    version: '1.0.0',
    description: "This service allows you to find the nearest branch",
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
    '/api/v1/branches': {
      get: branches.getAll,
    },
  },
};
