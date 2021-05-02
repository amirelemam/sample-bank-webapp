const { UnprocessableEntityError, InternalServerError } = require('../../common/errors');
const { NotFoundError } = require('../../common/errors');
const repository = require('./repository');

const ONE_MILLION = 1000000;
const TEN_THOUSAND = 10000;

/**
 * @description Returns an object with the id for that account
 * @param {Object} obj Deconstructed object
 * @param {string} obj.account Account number
 * @param {string} obj.branch Branch
 * @returns {Object} { accountId: "ID" }
 * @author Amir Elemam
 */
const getAccountId = async ({ account, branch, type }) => {
  const clientAccount = await repository.getAccount({ account, branch, type });

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
const getBalance = async ({
  account, branch, type, formatted = false,
}) => {
  const { accountId } = await module.exports.getAccountId({
    account,
    branch,
    type,
  });

  const accountBalance = await repository.getBalance(accountId);
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
      type,
    };
  }

  return {
    balance,
    branch,
    account,
    type,
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
const deposit = async ({
  account, branch, type, amount,
}) => {
  if (amount <= 0) {
    throw UnprocessableEntityError('Amount must be a positive number.');
  }
  if (amount > TEN_THOUSAND) {
    throw UnprocessableEntityError('Amount must be less than 10,000.00.');
  }

  const { accountId } = await module.exports.getAccountId({
    account,
    branch,
    type,
  });

  const { balance } = await module.exports.getBalance({
    account,
    branch,
    type,
  });

  const newBalance = balance + amount;

  if (newBalance > ONE_MILLION) {
    throw UnprocessableEntityError('New balance cannot be over 1,000,000.00.');
  }

  const [recordUpdated] = await repository.update(
    { balance: newBalance },
    accountId,
  );

  if (recordUpdated) {
    return {
      balance: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(recordUpdated.balance),
      branch,
      account,
      type,
    };
  }
  return null;
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
const withdraw = async ({
  account, branch, type, amount,
}) => {
  if (amount <= 0) {
    throw UnprocessableEntityError('Amount must be a positive number.');
  }
  if (amount > TEN_THOUSAND) {
    throw UnprocessableEntityError('Amount must be less than 10,000.00.');
  }

  const { accountId } = await module.exports.getAccountId({
    account,
    branch,
    type,
  });

  const { balance } = await module.exports.getBalance({
    account,
    branch,
    type,
  });

  const newBalance = balance - amount;

  if (newBalance < 0) {
    throw UnprocessableEntityError('Amount cannot be greater than balance.');
  }

  const [recordUpdated] = await repository.update(
    { balance: newBalance },
    accountId,
  );

  if (recordUpdated) {
    return {
      balance: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(recordUpdated.balance),
      branch,
      account,
      type,
    };
  }
  return null;
};

const transfer = async ({ amount, origin, destiny }) => {
  if (amount <= 0) {
    throw UnprocessableEntityError('Amount must be a positive number.');
  }
  if (amount > TEN_THOUSAND) {
    throw UnprocessableEntityError('Amount must be less than 10,000.00.');
  }

  const withdrawal = await module.exports.withdraw({ ...origin, amount });
  if (!withdrawal) throw InternalServerError('Cannot withdraw from account');

  const deposited = await module.exports.deposit({ ...destiny, amount });
  if (!deposited) throw InternalServerError('Cannot deposit to account');

  return {
    origin: withdrawal,
    destiny: deposited,
  };
};

module.exports = {
  getBalance,
  deposit,
  withdraw,
  transfer,
  getAccountId,
};
