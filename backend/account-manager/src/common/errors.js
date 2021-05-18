class GerericError extends Error {
  constructor(msg, status) {
    super(msg);
    this.status = status;
  }
}

exports.InternalServerError = (msg = 'Internal Server Error.') => new GerericError(msg, 500);

exports.BadRequestError = (
  msg = 'Missing fields or input in incorrect format.',
) => new GerericError(msg, 400);

exports.NotFoundError = (
  msg = 'The route or data in your request cannot be found.',
) => new GerericError(msg, 404);

exports.UnprocessableEntityError = (msg = 'Unable to perform this action.') => new GerericError(msg, 422);

exports.UnauthorizedError = (msg = 'access-token is invalid or expired.') => new GerericError(msg, 401);

exports.UnauthenticatedError = (msg = 'Invalid username or password.') => new GerericError(msg, 401);
