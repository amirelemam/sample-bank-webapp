'use strict';

const queries = require('./queries');
const accountService = require('../accounts/services');
const logger = require('../../common/logger');
const { UnprocessableEntityError } = require('../../common/errors');
const { NotFoundError } = require('../../../../common/errors');

const reserve = async ({ clientId, account, branch, ammount }) => {
  if (ammount <= 0) {
    throw UnprocessableEntityError('Amount must be a positive number.');
  }

  const clientAccount = await accountService.getAccount({
    clientId,
    account,
    branch,
  });
  if (!clientAccount) {
    throw NotFoundError('Account not found or does not belong to this client');
  }

  const { id: accountId } = clientAccount;

  const accountBalance = await queries.getBalance(accountId);
  if (!accountBalance) {
    throw NotFoundError('Cannot find balance for account.');
  }

  const {
    unreserved: currentUnreservedBalance,
    reserved: currentReservedBalance,
  } = accountBalance;

  const newUnreservedBalance = currentUnreservedBalance - ammount;
  if (newUnreservedBalance < 0) {
    throw UnprocessableEntityError('Amount is greater than balance.');
  }

  const newrRservedBalance = currentReservedBalance + ammount;

  console.log('#####', queries.update);

  const [recordUpdated] = await queries.update(
    { unreserved: newUnreservedBalance, reserved: newrRservedBalance },
    accountId
  );

  if (recordUpdated) {
    return {
      ...recordUpdated,
      branch,
      account,
    };
  } else {
    return null;
  }
};

const unreserve = async ({ clientId, ammount }) => {
  // check if ammount is positive
  // get current balance
  // check new reserved balance >= zero
  // update balance (reserved & unreserved)
};

module.exports = {
  reserve,
  unreserve,
};
