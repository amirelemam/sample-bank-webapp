'use strict';

const services = require('./services');

const deposit = ({ account, branch, amount }) => {
  return services.deposit({ account, branch, amount });
};

const withdraw = ({ account, branch, amount }) => {
  return services.withdraw({ account, branch, amount });
};

const getBalance = ({ account, branch }) => {
  return services.getBalance({ account, branch, formatted: true });
};

module.exports = {
  deposit,
  withdraw,
  getBalance,
};
