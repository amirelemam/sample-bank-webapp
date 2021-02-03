'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const sanitize = require('sanitize');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = require('./docs/swaggerDefinition');
const sentry = require('./common/sentry');
const logger = require('./common/logger');
const routes = require('./routes');
const { NotFoundError } = require('./common/errors');
const { isDev, isTest } = require('./common/utils');
require('./db');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(sanitize.middleware);
app.use(morgan('dev'));

if (!isDev()) {
  // eslint-disable-next-line no-unused-vars
  app.use((req, res, next) => {
    res.header('Access-Control-Expose-Headers', 'access-token');
    res.header(
      'Access-Control-Allow-Origin',
      'https://amirelemam.com.s3-website-us-east-1.amazonaws.com'
    );
    return next();
  });
}

const options = {
  swaggerDefinition,
  apis: ['./components/**/routes.js'],
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1', routes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err) {
    logger.error(err.stack);
    if (!isDev() && !isTest()) sentry.captureException(err.stack);

    if (!err.status) return res.status(500).json();
    return res.status(err.status).send({ error: err.message });
  } else {
    const { status, message } = NotFoundError();
    return res.status(status).send(message);
  }
});

module.exports = app;
