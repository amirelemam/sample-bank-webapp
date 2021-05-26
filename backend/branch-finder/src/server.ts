import logger from './common/logger'
import app from './app'

app.listen(app.get('port'),
  () => logger.info(`Server running at ${app.get('port')}`));

export default app;
