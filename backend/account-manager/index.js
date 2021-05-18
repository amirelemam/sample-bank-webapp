const logger = require('./src/common/logger');
const app = require('./src/app');

app.listen(app.get('port'),
  () => logger.info(`Server running at ${app.get('port')}`));

module.exports = app;
