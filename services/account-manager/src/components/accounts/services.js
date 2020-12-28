'use strict';

const queries = require('./queries');
const { UnprocessableEntityError } = require('../../common/errors');
const { NotFoundError } = require('../../../../common/errors');

/**
 * @description Returns an object with the id for that account
 * @param {Object} obj Deconstructed object
 * @param {string} obj.account Account number
 * @param {string} obj.branch Branch
 * @returns {Object} { accountId: "ID" }
 * @author Amir Elemam
 */
const getAccountId = async ({ account, branch }) => {
  const clientAccount = await queries.getAccount({ account, branch });

  if (!clientAccount) {
    throw NotFoundError('Account not found');
  }

  return { accountId: clientAccount.id };
};

/**
 * @description Returns the balance for the account
 * @param {Object} obj Deconstructed object
 * @param {string} obj.account Account number
 * @param {string} obj.branch Branch
 * @param {boolean} obj.formatted Indicates balance formatted as price
 * @returns {Object} {
 *                     balance: "$1,000.00",
 *                     branch: "0001",
 *                     account: "12345"
 *                   }
 * @author Amir Elemam
 */
const getBalance = async ({ account, branch, formatted = false }) => {
  const { accountId } = await getAccountId({ account, branch });

  const accountBalance = await queries.getBalance(accountId);
  if (!accountBalance) {
    throw NotFoundError('Cannot find balance for account.');
  }

  const { balance } = accountBalance;

  if (formatted) {
    return {
      balance: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(balance),
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
 * @param {boolean} obj.amount Amount to be deposited
 * @returns {null|Object} {
 *                         balance: "$1,000.00",
 *                         branch: "0001",
 *                         account: "12345"
 *                        }
 * @author Amir Elemam
 */
const deposit = async ({ account, branch, amount }) => {
  if (amount <= 0) {
    throw UnprocessableEntityError('Amount must be a positive number.');
  }

  const { accountId } = await getAccountId({ account, branch });

  const { balance } = await getBalance({ account, branch });

  const newBalance = balance + amount;

  const [recordUpdated] = await queries.update(
    { balance: newBalance },
    accountId
  );

  if (recordUpdated) {
    return {
      balance: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(recordUpdated.balance),
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
 * @param {boolean} obj.amount Amount to be withdrew
 * @returns {null|Object} {
 *                          balance: "$1,000.00",
 *                          branch: "0001",
 *                          account: "12345"
 *                        }
 * @author Amir Elemam
 */
const withdraw = async ({ account, branch, amount }) => {
  if (amount <= 0) {
    throw UnprocessableEntityError('Amount must be a positive number.');
  }

  const { accountId } = await getAccountId({ account, branch });

  const { balance } = await getBalance({ account, branch });

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
      balance: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(recordUpdated.balance),
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
