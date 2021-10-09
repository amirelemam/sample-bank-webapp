import winston from 'winston';
import { TransformableInfo } from 'logform';

const { combine, printf, colorize, errors } = winston.format;

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'blue',
    verbose: 'white',
    debug: 'white',
    silly: 'white',
  },
};

winston.addColors(customLevels.colors);

export default winston.createLogger({
  format: combine(
    errors({ stack: true }),
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    colorize(),
    printf(
      ({ timestamp, level, message, stack }) =>
        `${timestamp} - ${level}: ${level === '\x1B[31merror\x1B[39m' ? `${stack}` : `${message}`}`,
    ),
  ),
  transports: [
    new winston.transports.Console({
      level: process.env.LOGGING_LEVEL || 'debug',
    }),
  ],
});
