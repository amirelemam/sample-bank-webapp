class GerericError extends Error {
  constructor(msg, status) {
    super(msg);

    this.status = status;
  }
}

exports.InternalServerError = (msg = 'Internal Server Error.') => new GerericError(msg, 500);
