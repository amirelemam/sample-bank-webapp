const services = require('./services');
const balanceService = require('./components/balances/services');

const transfer = async ({ amount, origin, destiny }) => {
  const { accountId: accountIdOrigin } = await services.getAccountId(
    origin.account,
    origin.branch,
    origin.accountType,
  );

  const { balance: balanceOrigin } = await balanceService.getBalance(
    { accountId: accountIdOrigin },
  );

  const newBalanceOrigin = await balanceService.withdraw(accountIdOrigin, amount, balanceOrigin);

  const { accountId: accountIdDestiny } = await services.getAccountId(
    destiny.account,
    destiny.branch,
    destiny.accountType,
  );

  const { balance: balanceDestiny } = await balanceService.getBalance(
    { accountId: accountIdDestiny },
  );

  const newBalanceDestiny = await balanceService.deposit(accountIdDestiny, amount, balanceDestiny);

  return {
    origin: {
      ...newBalanceOrigin,
      ...origin,
    },
    destiny: {
      ...newBalanceDestiny,
      ...destiny,
    },
  };
};

/**
 * @description Returns the balance for the account
 * @param {Object} obj Deconstructed object
 * @param {string} obj.account Account number
 * @param {string} obj.branch Branch
 * @returns {Object} {
 *                     balance: "$1,000.00",
 *                     branch: "0001",
 *                     account: "12345"
 *                     accountType: "CHECKING"
 *                   }
 */
const getBalance = async ({
  account, branch, accountType,
}) => {
  const { accountId } = await services.getAccountId(
    account,
    branch,
    accountType,
  );

  const balance = await balanceService.getBalance({
    accountId,
    formatted: true,
  });

  return {
    ...balance,
    account,
    branch,
    accountType,
  };
};

module.exports = {
  transfer,
  getBalance,
};
