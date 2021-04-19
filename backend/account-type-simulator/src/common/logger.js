const winston = require('winston');

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

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
          format: 'YYYY-MM-DDHH:mm:ss',
        }),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
      level: process.env.LOGGING_LEVEL || 'info',
    }),
  ],
});

module.exports = logger;
module.exports.stream = {
  write: function (message, encoding) {
    logger.http(message);
  },
};
