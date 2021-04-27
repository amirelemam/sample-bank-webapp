const services = require('./services');

const isAlive = () => services.isAlive();

module.exports = {
  isAlive,
};
