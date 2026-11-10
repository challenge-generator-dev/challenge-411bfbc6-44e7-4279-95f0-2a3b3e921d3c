import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HttpException } from '../exceptions/httpExceptions';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof HttpException) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.statusCode,
        message: err.message,
      },
    });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      error: {
        code: 400,
        message: 'Validation error',
        details: err.message,
      },
    });
    return;
  }
  if (err.name === 'CastError' && err.message.includes('ObjectId')) {
    res.status(400).json({
      success: false,
      error: {
        code: 400,
        message: 'Invalid ID format',
      },
    });
    return;
  }
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: {
      code: 500,
      message: 'Internal server error',
    },
  });
};