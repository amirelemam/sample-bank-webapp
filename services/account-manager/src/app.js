'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const sanitize = require('sanitize');
const morgan = require('morgan');
const sentry = require('./common/sentry');
const { NotFoundError } = require('./common/errors');

const logger = require('./common/logger');
const routes = require('./routes');
require('./db');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(sanitize.middleware);
app.use(morgan('combined', { stream: logger.stream }));

// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'access-token');
  res.header('Access-Control-Allow-Origin', '*');
  return next();
});

app.use('/api/v1', routes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err) {
    logger.error(err.stack);
    sentry.captureException(err.stack);

    if (!err.status) return res.status(500).json();
    return res.status(err.status).send({ error: err.message });
  } else {
    const { status, message } = NotFoundError();
    return res.status(status).send(message);
  }
});

module.exports = app;
