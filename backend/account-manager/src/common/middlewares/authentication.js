const axios = require('axios');
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const {
  UnauthorizedError,
  UnauthenticatedError,
  InternalServerError,
} = require('../errors');
const { isDev, isTest } = require('../utils');
const logger = require('../logger');

const getJwk = async () => {
  try {
    const userPoolId = process.env.USER_POOL_ID;
    const awsRegion = process.env.AWS_REGION;

    const {
      data: { keys },
    } = await axios.get(
      `https://cognito-idp.${awsRegion}.amazonaws.com/${userPoolId}/.well-known/jwks.json`
    );

    return keys;
  } catch (error) {
    logger.debug(error);
    return null;
  }
};

const isValidUser = (user) => {
  const userPoolId = process.env.USER_POOL_ID;
  const awsRegion = process.env.AWS_REGION;
  const awsUserAud = process.env.AWS_USER_AUD;

  const isValidIss =
    user.iss === `https://cognito-idp.${awsRegion}.amazonaws.com/${userPoolId}`;

  const isValidTokenUse = user.token_use === 'id';
  const isValidClientId = user.aud === awsUserAud;

  return isValidClientId && isValidIss && isValidTokenUse;
};

const authentication = async (req, res, next) => {
  try {
    if (isTest() || isDev()) return next();

    const accessToken = req.headers.authorization.split(' ')[1];

    if (!accessToken) throw UnauthenticatedError();

    const jwk = await getJwk();

    if (!jwk) throw InternalServerError();

    const pem = jwkToPem(jwk[0]);

    const user = jwt.verify(
      accessToken,
      pem,
      { algorithms: ['RS256'] },
      function (err, decodedToken) {
        if (err) return null;
        else return decodedToken;
      }
    );

    if (!isValidUser(user)) throw UnauthenticatedError();

    req.user = user;
    next();
  } catch (error) {
    logger.error(error);
    next(UnauthorizedError());
  }
};

module.exports = authentication;
