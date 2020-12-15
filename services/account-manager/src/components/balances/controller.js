'use strict';

const services = require('./services');

const reserve = ({ clientId, account, branch, ammount }) => {
  return services.reserve({ clientId, account, branch, ammount });
};

const unreserve = async ({ clientId, account, branch, ammount }) => {
  return services.unreserve({ clientId, account, branch, ammount });
};

const getAccount = async ({ account, branch, clientId }) => {
  return services.getAccount({ account, branch, clientId });
};

module.exports = {
  reserve,
  unreserve,
  getAccount,
};
