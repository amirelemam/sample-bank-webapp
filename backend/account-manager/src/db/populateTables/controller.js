const populateTables = require('./queries');

const all = async () => {
  await populateTables.clients();
  await populateTables.accounts();
  await populateTables.balances();
};

const clients = async () => {
  await populateTables.clients();
};

const accounts = async () => {
  await populateTables.accounts();
};

const balances = async () => {
  await populateTables.balances();
};

module.exports = {
  all,
  clients,
  accounts,
  balances,
};
