'use strict';

const services = require('./services');

const deposit = ({ clientId, account, branch, ammount }) => {
  return services.deposit({ clientId, account, branch, ammount });
};

const withdraw = ({ clientId, account, branch, ammount }) => {
  return services.withdraw({ clientId, account, branch, ammount });
};

const getBalance = ({ account, branch, clientId }) => {
  return services.getBalance({ account, branch, clientId, formatted: true });
};

module.exports = {
  deposit,
  withdraw,
  getBalance,
};
