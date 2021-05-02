const logger = require('./common/logger');
const app = require('./app');

app.listen(app.get('port'),
  () => logger.info(`Server running at ${app.get('port')}`));

module.exports = app;
