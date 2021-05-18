const populateTables = require('./queries');

const all = async () => {
  await populateTables.clients();
  await populateTables.accounts();
  await populateTables.balances();
  await populateTables.auth();
};

const clients = async () => {
  await populateTables.clients();
};

module.exports = {
  all,
  clients,
};
