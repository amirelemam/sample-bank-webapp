const services = require('./services');

const transfer = ({ amount, origin, destiny }) => services.transfer({ amount, origin, destiny });

const getBalance = ({ account, branch, type }) => services.getBalance({
  account, branch, type, formatted: true,
});

module.exports = {
  transfer,
  getBalance,
};
