const logger = require('./common/logger');
const app = require('./app');

const PORT = process.env.PORT || 4020;
app.listen(PORT, () => logger.info(`Server running at ${PORT}`));

module.exports = app;
