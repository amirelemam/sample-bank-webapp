const logger = require('./logger');
const db = require('../db');

const isDev = () => process.env.NODE_ENV === 'dev';

const isTest = () => process.env.NODE_ENV === 'test';

const checkRequiredVars = (listOfEnvNames) => {
  if (isDev() || isTest()) return;
  if (!Array.isArray(listOfEnvNames)) {
    const message = 'Cannot check list of env vars. List must be an array';
    logger.error(message);
    throw new Error(message);
  }

  const envVarsNotPresent = [];
  for (let i = 0; i < listOfEnvNames.length; i += 1) {
    if (process.env[listOfEnvNames[i]] === undefined) envVarsNotPresent.push(listOfEnvNames[i]);
  }

  if (envVarsNotPresent.length > 0) {
    const message = `Cannot find env vars: ${envVarsNotPresent.join(' ')}`;
    logger.error(message);
    throw new Error(message);
  }
};

const testDBConnection = db
  .raw('SELECT 1')
  .then(() => logger.info({ message: 'Successfully connected to DB' }))
  .catch((error) => {
    const message = 'Could not connect to DB';
    logger.error({ message, error });
    throw new Error(message);
  });

module.exports = {
  isDev,
  isTest,
  checkRequiredVars,
  testDBConnection,
};
