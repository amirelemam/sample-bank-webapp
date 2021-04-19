const services = require('./services');

const transfer = ({ amount, origin, destiny }) => {
  return services.transfer({ amount, origin, destiny });
};

const getBalance = ({ account, branch, type }) => {
  return services.getBalance({ account, branch, type, formatted: true });
};

module.exports = {
  transfer,
  getBalance,
};
