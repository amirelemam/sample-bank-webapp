import winston from 'winston';
import { TransformableInfo } from 'logform';

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
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
          format: 'YYYY-MM-DDHH:mm:ss',
        }),
        winston.format.printf(
          (info: TransformableInfo) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
      ),
      level: 'debug',
    }),
  ],
});
