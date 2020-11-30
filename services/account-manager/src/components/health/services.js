'use strict';

const packageJson = require('../../../package.json');

const isAlive = () => {
  return {
    message: "I'm alive!",
    version: packageJson.version,
  };
};

module.exports = {
  isAlive,
};
