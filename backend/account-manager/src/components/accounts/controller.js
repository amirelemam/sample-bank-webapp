'use strict';

const services = require('./services');

const deposit = ({ account, branch, type, amount }) => {
  return services.deposit({ account, branch, type, amount });
};

const withdraw = ({ account, branch, type, amount }) => {
  return services.withdraw({ account, branch, type, amount });
};

const transfer = ({ amount, origin, destiny }) => {
  return services.transfer({ amount, origin, destiny });
};

const getBalance = ({ account, branch, type }) => {
  return services.getBalance({ account, branch, type, formatted: true });
};

module.exports = {
  deposit,
  withdraw,
  transfer,
  getBalance,
};
