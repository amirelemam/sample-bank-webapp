class GerericError extends Error {
  constructor(msg, status) {
    super(msg);

    this.status = status;
  }
}

exports.BadRequestError = (
  msg = 'Missing fields or input in incorrect format.',
) => new GerericError(msg, 400);

exports.InternalServerError = (msg = 'Internal Server Error.') => new GerericError(msg, 500);
