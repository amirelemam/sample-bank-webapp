const services = require('./services');

const validateLogin = async ({
  account, branch, password,
}) => services.validateLogin({
  account, branch, password,
});

module.exports = {
  validateLogin,
};
