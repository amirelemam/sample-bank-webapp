'use strict';

const services = require('./services');

const deposit = ({ clientId, account, branch, amount }) => {
  return services.deposit({ clientId, account, branch, amount });
};

const withdraw = ({ clientId, account, branch, amount }) => {
  return services.withdraw({ clientId, account, branch, amount });
};

const getBalance = ({ account, branch, clientId }) => {
  return services.getBalance({ account, branch, clientId, formatted: true });
};

module.exports = {
  deposit,
  withdraw,
  getBalance,
};
