'use strict';

const queries = require('./queries');
const { UnprocessableEntityError } = require('../../common/errors');
const { NotFoundError } = require('../../../../common/errors');

/**
 * @description Returns an object with the id for that account
 * @param {Object} obj Deconstructed object
 * @param {string} obj.account Account number
 * @param {string} obj.branch Branch
 * @param {string} obj.clientId Client Id
 * @returns {Object} { accountId: "ID" }
 * @author Amir Elemam
 */
const getAccountId = async ({ account, branch, clientId }) => {
  const clientAccount = await queries.getAccount({ account, branch, clientId });

  if (!clientAccount) {
    throw NotFoundError('Account not found or does not belong to this client');
  }

  return { accountId: clientAccount.id };
};

/**
 * @description Returns the balance for the account
 * @param {Object} obj Deconstructed object
 * @param {string} obj.account Account number
 * @param {string} obj.branch Branch
 * @param {string} obj.clientId Client Id
 * @param {boolean} obj.formatted Indicates balance formatted as price
 * @returns {Object} {
 *                     balance: "1000.00",
 *                     branch: "0001",
 *                     account: "12345"
 *                   }
 * @author Amir Elemam
 */
const getBalance = async ({ account, branch, clientId, formatted = false }) => {
  const { accountId } = await getAccountId({ account, branch, clientId });

  const accountBalance = await queries.getBalance(accountId);
  if (!accountBalance) {
    throw NotFoundError('Cannot find balance for account.');
  }

  const { balance } = accountBalance;

  if (formatted) {
    return {
      balance: balance.toFixed(2),
      branch,
      account,
    };
  }

  return {
    balance,
    branch,
    account,
  };
};

/**
 * @description Deposits an amount to the account
 * @param {Object} obj Deconstructed object
 * @param {string} obj.account Account number
 * @param {string} obj.branch Branch
 * @param {string} obj.clientId Client Id
 * @param {boolean} obj.amount Amount to be deposited
 * @returns {null|Object} {
 *                         balance: "1000.00",
 *                         branch: "0001",
 *                         account: "12345"
 *                        }
 * @author Amir Elemam
 */
const deposit = async ({ clientId, account, branch, amount }) => {
  if (amount <= 0) {
    throw UnprocessableEntityError('Amount must be a positive number.');
  }

  const { accountId } = await getAccountId({ account, branch, clientId });

  const { balance } = await getBalance({ account, branch, clientId });

  const newBalance = balance + amount;

  const [recordUpdated] = await queries.update(
    { balance: newBalance },
    accountId
  );

  if (recordUpdated) {
    return {
      balance: recordUpdated.balance.toFixed(2),
      branch,
      account,
    };
  } else {
    return null;
  }
};

/**
 * @description Withdraws an amount from the account
 * @param {Object} obj Deconstructed object
 * @param {string} obj.account Account number
 * @param {string} obj.branch Branch
 * @param {string} obj.clientId Client Id
 * @param {boolean} obj.amount Amount to be withdrew
 * @returns {null|Object} {
 *                          balance: "1000.00",
 *                          branch: "0001",
 *                          account: "12345"
 *                        }
 * @author Amir Elemam
 */
const withdraw = async ({ clientId, account, branch, amount }) => {
  if (amount <= 0) {
    throw UnprocessableEntityError('Amount must be a positive number.');
  }

  const { accountId } = await getAccountId({ account, branch, clientId });

  const { balance } = await getBalance({ account, branch, clientId });

  const newBalance = balance - amount;

  if (newBalance < 0) {
    throw UnprocessableEntityError('Amount cannot be greater than balance.');
  }

  const [recordUpdated] = await queries.update(
    { balance: newBalance },
    accountId
  );

  if (recordUpdated) {
    return {
      balance: recordUpdated.balance.toFixed(2),
      branch,
      account,
    };
  } else {
    return null;
  }
};

module.exports = {
  getBalance,
  deposit,
  withdraw,
};
