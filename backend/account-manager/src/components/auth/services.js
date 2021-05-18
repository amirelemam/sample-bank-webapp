const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const repository = require('./repository');
const { UnauthenticatedError } = require('../../common/errors');
const logger = require('../../common/logger');

const secret = process.env.SECRET_TOKEN;

const verifyToken = async (token) => {
  try {
    if (!token) return false;

    await jwt.verify(token, secret);

    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

const buildToken = (data) => {
  const expirationTimeInSeconds = 60 * 60 * 24; // 1 day
  return jwt.sign(data, secret, { expiresIn: expirationTimeInSeconds });
};

// const generateSalt = () => crypto.randomBytes(32).toString('hex');

const generateHashedPassword = (password, salt) => crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

const validateLogin = async ({
  account, branch, password,
}) => {
  const credencials = await repository.getAccountCredentials({ account, branch });

  if (!credencials) throw UnauthenticatedError();

  const hashVerify = generateHashedPassword(password, credencials.salt);

  if (credencials.password === hashVerify) {
    return buildToken({
      account, branch, password: hashVerify,
    });
  }
  throw UnauthenticatedError();
};

module.exports = {
  verifyToken,
  validateLogin,
  generateHashedPassword,
};
