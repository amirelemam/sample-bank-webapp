import winston from 'winston';
import { TransformableInfo } from 'logform';

const customLevels = {
  levels: {
    info: 0,
    warn: 1,
    debug: 2,
    error: 3,
  },
  colors: {
    info: 'green',
    warn: 'yellow',
    debug: 'blue',
    error: 'red',
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
          (info: TransformableInfo) =>
            `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
      level: 'info',
    }),
  ],
});
