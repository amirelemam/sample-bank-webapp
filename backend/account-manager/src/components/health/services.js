const packageJson = require('../../../package.json');

/**
 * @description Returns system info
 * @returns {Object} {
 *                     message: "I'm alive!",
 *                     version: "1.0"
 *                   }
 * @author Amir Elemam
 */
const isAlive = () => {
  return {
    message: "I'm alive!",
    version: packageJson.version,
  };
};

module.exports = {
  isAlive,
};
