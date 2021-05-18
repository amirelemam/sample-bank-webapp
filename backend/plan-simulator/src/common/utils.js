const isDev = () => process.env.NODE_ENV === 'dev';
const isTest = () => process.env.NODE_ENV === 'test';

module.exports = {
  isDev,
  isTest,
};
