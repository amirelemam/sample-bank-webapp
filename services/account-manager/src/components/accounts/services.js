'use strict';

const queries = require('./queries');

const getAccount = ({ account, branch, clientId }) => {
  return queries.getAccount({ account, branch, clientId });
};

module.exports = {
  getAccount,
};
