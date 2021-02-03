const logger = require('./logger');

class GerericError extends Error {
  constructor(msg, status) {
    super(msg);

    this.log = () => logger.error(this.message);
    this.status = status;
  }
}

exports.ConflictError = (
  msg = 'Request data may have fields that are not unique, not updatable or are already registered.'
) => new GerericError(msg, 409);

exports.InternalServerError = (msg = 'Internal Server Error.') =>
  new GerericError(msg, 500);

exports.BadRequestError = (
  msg = 'Missing fields or input in incorrect format.'
) => new GerericError(msg, 400);

exports.NotFoundError = (
  msg = 'The route or data in your request cannot be found.'
) => new GerericError(msg, 404);

exports.UnauthorizedError = (msg = 'access-token is invalid or expired.') =>
  new GerericError(msg, 401);

exports.UnauthenticatedError = (msg = 'Invalid username or password.') =>
  new GerericError(msg, 401);

exports.ForbiddenError = (
  msg = 'you are not allowed to access to this resource or perform this action.'
) => new GerericError(msg, 403);

exports.UnprocessableEntityError = (msg = 'Unable to perform this action.') =>
  new GerericError(msg, 422);
