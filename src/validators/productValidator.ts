import { body, param, ValidationChain } from 'express-validator';

export const createProductValidationRules: ValidationChain[] = [
  body('name')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto')
    .notEmpty()
    .withMessage('El nombre es requerido')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('El nombre debe tener entre 1 y 100 caracteres'),

  body('price')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número mayor o igual a 0'),

  body('stock')
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero mayor o igual a 0'),

  body('category')
    .isString()
    .withMessage('La categoría debe ser una cadena de texto')
    .notEmpty()
    .withMessage('La categoría es requerida')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('La categoría debe tener entre 1 y 50 caracteres'),
];

export const updateProductValidationRules: ValidationChain[] = [
  param('id')
    .isString()
    .withMessage('El ID debe ser una cadena de texto')
    .notEmpty()
    .withMessage('El ID es requerido')
    .trim()
    .isUUID()
    .withMessage('El ID debe ser un UUID válido'),

  body('name')
    .optional()
    .isString()
    .withMessage('El nombre debe ser una cadena de texto')
    .notEmpty()
    .withMessage('El nombre no puede estar vacío')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('El nombre debe tener entre 1 y 100 caracteres'),

  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número mayor o igual a 0'),

  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero mayor o igual a 0'),

  body('category')
    .optional()
    .isString()
    .withMessage('La categoría debe ser una cadena de texto')
    .notEmpty()
    .withMessage('La categoría no puede estar vacía')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('La categoría debe tener entre 1 y 50 caracteres'),
];

export const productIdValidationRule: ValidationChain = param('id')
  .isString()
  .withMessage('El ID debe ser una cadena de texto')
  .notEmpty()
  .withMessage('El ID es requerido')
  .trim()
  .isUUID()
  .withMessage('El ID debe ser un UUID válido');