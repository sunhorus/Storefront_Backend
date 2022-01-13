import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors/HttpError';

function errorMiddleware(
  error: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);
  const status = error instanceof HttpError ? error.status : 500;
  const message =
    error instanceof HttpError && error.status != 500
      ? error.message
      : 'Something went wrong';

  res.status(status).json({ message });

  next();
}

export default errorMiddleware;
