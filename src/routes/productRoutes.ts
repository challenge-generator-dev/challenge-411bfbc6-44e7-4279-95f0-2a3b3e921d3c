import { Router, Request, Response, NextFunction } from 'express';
import { ProductController } from '../controllers/productController';
import { ValidationMiddleware } from '../middlewares/validationMiddleware';
import { param } from 'express-validator';

export const productRoutes = Router();

const productController = new ProductController();

const validateProductId = [
    param('id')
        .isString()
        .withMessage('El ID del producto debe ser una cadena')
        .notEmpty()
        .withMessage('El ID del producto es requerido')
        .isUUID()
        .withMessage('El ID del producto debe ser un UUID válido')
];

productRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await productController.getAllProducts(req, res);
    } catch (error) {
        next(error);
    }
});

productRoutes.get('/:id', ValidationMiddleware.validateRequest(validateProductId), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await productController.getProductById(req, res);
    } catch (error) {
        next(error);
    }
});

productRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await productController.createProduct(req, res);
    } catch (error) {
        next(error);
    }
});

productRoutes.put('/:id', ValidationMiddleware.validateRequest(validateProductId), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await productController.updateProduct(req, res);
    } catch (error) {
        next(error);
    }
});

productRoutes.delete('/:id', ValidationMiddleware.validateRequest(validateProductId), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await productController.deleteProduct(req, res);
    } catch (error) {
        next(error);
    }
});