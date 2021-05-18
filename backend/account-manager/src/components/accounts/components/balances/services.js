const repository = require('./repository');
const { NotFoundError, UnprocessableEntityError, InternalServerError } = require('../../../../common/errors');

const ONE_MILLION = 1000000;
const TEN_THOUSAND = 10000;

// * @param {boolean} obj.formatted Indicates balance formatted as price
const getBalance = async (
  {
    accountId,
    formatted,
  },
) => {
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
    };
  }

  return {
    balance,
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
const deposit = async (
  accountId, amount, balance,
) => {
  if (amount <= 0) {
    throw UnprocessableEntityError('Amount must be a positive number.');
  }
  if (amount > TEN_THOUSAND) {
    throw UnprocessableEntityError('Amount must be less than 10,000.00.');
  }

  const newBalance = balance + amount;

  if (newBalance > ONE_MILLION) {
    throw UnprocessableEntityError('New balance cannot be over 1,000,000.00.');
  }

  const [recordUpdated] = await repository.update(
    { balance: newBalance },
    accountId,
  );

  if (!recordUpdated) throw InternalServerError('Cannot deposit to account');

  return {
    balance: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(recordUpdated.balance),
  };
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
const withdraw = async (
  accountId, amount, balance,
) => {
  if (amount <= 0) {
    throw UnprocessableEntityError('Amount must be a positive number.');
  }
  if (amount > TEN_THOUSAND) {
    throw UnprocessableEntityError('Amount must be less than 10,000.00.');
  }

  const newBalance = balance - amount;

  if (newBalance < 0) {
    throw UnprocessableEntityError('Amount cannot be greater than balance.');
  }

  const [recordUpdated] = await repository.update(
    { balance: newBalance },
    accountId,
  );

  if (!recordUpdated) throw InternalServerError('Cannot withdraw from account');

  return {
    balance: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(recordUpdated.balance),
  };
};

module.exports = {
  getBalance,
  deposit,
  withdraw,
};
