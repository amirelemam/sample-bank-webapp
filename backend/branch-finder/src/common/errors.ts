class GerericError extends Error {
  status: number;

  constructor(msg: string, status: number) {
    super(msg);

    this.status = status;
  }
}

export const NotFoundError = (
  msg = 'The route or data in your request cannot be found.',
) => new GerericError(msg, 404);

export const InternalServerError = (
  msg = 'Internal Server Error.'
) => new GerericError(msg, 500);

export class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
