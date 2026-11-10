import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain, param } from 'express-validator';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
      return;
    }
    const extractedErrors = errors.array().map((err) => ({
      field: 'path' in err ? err.path : 'unknown',
      message: 'msg' in err ? err.msg : 'Invalid value',
    }));
    res.status(400).json({
      success: false,
      error: {
        code: 400,
        message: 'Validation failed',
        details: extractedErrors,
      },
    });
  };
};

export const validateProductCreation = validate([]);
export const validateProductUpdate = validate([]);

export const validateProductId = [
  param('id')
    .notEmpty()
    .withMessage('El ID del producto es requerido')
    .isString()
    .withMessage('El ID debe ser una cadena de texto')
    .trim()
    .isLength({ min: 1 })
    .withMessage('El ID no puede estar vacío'),
];

export class ValidationMiddleware {
  static validateRequest(validations: ValidationChain[]): (req: Request, res: Response, next: NextFunction) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        await Promise.all(validations.map((validation) => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          next();
          return;
        }
        const formattedErrors = errors.array().map((err) => {
          if ('path' in err && 'msg' in err) {
            return { field: err.path, message: err.msg };
          }
          return { field: 'unknown', message: String(err) };
        });
        res.status(400).json({
          success: false,
          error: {
            code: 400,
            message: 'Request validation failed',
            details: formattedErrors,
          },
        });
        return;
      } catch (error) {
        next(error);
      }
    };
  }

  static extractValidationErrors(req: Request): { field: string; message: string }[] {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errors.array().map((err) => ({
        field: 'path' in err ? err.path : 'unknown',
        message: 'msg' in err ? err.msg : 'Invalid value',
      }));
    }
    return [];
  }

  static hasValidationErrors(req: Request): boolean {
    return !validationResult(req).isEmpty();
  }

  static getFirstError(req: Request): { field: string; message: string } | null {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return null;
    }
    const firstError = errors.array()[0];
    if (firstError && 'path' in firstError && 'msg' in firstError) {
      return { field: firstError.path, message: firstError.msg };
    }
    return { field: 'unknown', message: 'Unknown validation error' };
  }
}