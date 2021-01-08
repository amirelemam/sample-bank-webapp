'use strict';

const serverless = require('serverless-http');
const app = require('./src/app');

if (process.env.NODE_ENV === 'test') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log('Server running at', PORT));
} else {
  module.exports.handler = serverless(app);
}
