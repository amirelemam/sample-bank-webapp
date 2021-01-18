'use strict';

const serverless = require('serverless-http');
const logger = require('./src/common/logger');
const app = require('./src/app');

if (process.env.NODE_ENV === 'test') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => logger.info('Server running at', PORT));
} else {
  module.exports.handler = serverless(app);
}
