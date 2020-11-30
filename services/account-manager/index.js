'use strict';

const serverless = require('serverless-http');
const app = require('./src/app');

if (process.env.NODE_ENV === 'test') {
  app.listen(4000);
} else {
  module.exports.handler = serverless(app);
}
