'use strict';

const services = require('./services');

const isAlive = () => {
  return services.isAlive();
};

module.exports = {
  isAlive,
};
