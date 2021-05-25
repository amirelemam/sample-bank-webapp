const { NotFoundError } = require('../../common/errors');
const repository = require('./repository');

/**
 * @description Returns an object with the id for that account
 * @param {Object} obj Deconstructed object
 * @param {string} obj.account Account number
 * @param {string} obj.branch Branch
 * @returns {Object} { accountId: "ID" }
 */
const getAccountId = async (account, branch, accountType) => {
  const clientAccount = await repository.getAccount({ account, branch, accountType });

  if (!clientAccount) throw NotFoundError('Account not found');

  return { accountId: clientAccount.id };
};

module.exports = {
  getAccountId,
};
