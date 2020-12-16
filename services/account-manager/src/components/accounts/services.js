'use strict';

const queries = require('./queries');
const { UnprocessableEntityError } = require('../../common/errors');
const { NotFoundError } = require('../../../../common/errors');

const getAccount = async ({ account, branch, clientId }) => {
  const clientAccount = await queries.getAccount({ account, branch, clientId });

  if (!clientAccount) {
    throw NotFoundError('Account not found or does not belong to this client');
  }

  return { accountId: clientAccount.id };
};

const getBalance = async ({ account, branch, clientId, formatted = false }) => {
  const { accountId } = await getAccount({ account, branch, clientId });

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

const deposit = async ({ clientId, account, branch, ammount }) => {
  if (ammount <= 0) {
    throw UnprocessableEntityError('Amount must be a positive number.');
  }

  const { accountId } = await getAccount({ account, branch, clientId });

  const { balance } = await getBalance({ account, branch, clientId });

  const newBalance = balance + ammount;

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

const withdraw = async ({ clientId, account, branch, ammount }) => {
  if (ammount <= 0) {
    throw UnprocessableEntityError('Amount must be a positive number.');
  }

  const { accountId } = await getAccount({ account, branch, clientId });

  const { balance } = await getBalance({ account, branch, clientId });

  const newBalance = balance - ammount;

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
