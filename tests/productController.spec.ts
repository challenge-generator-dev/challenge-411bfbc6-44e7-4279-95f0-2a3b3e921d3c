import { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import { ProductController } from '../src/controllers/productController';
import { ProductService } from '../src/services/productService';
import { ProductDTO, CreateProductDTO, UpdateProductDTO } from '../src/dto/productDTO';

describe('ProductController', () => {
    let controller: ProductController;
    let mockService: jest.Mocked<ProductService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;

    const mockProduct: ProductDTO = {
        id: '123',
        name: 'Laptop',
        price: 999.99,
        stock: 10,
        category: 'Electronics',
        createdAt: new Date(),
        updatedAt: new Date()
    };

    beforeEach(() => {
        mockService = {
            getAllProducts: jest.fn(),
            getProductById: jest.fn(),
            createProduct: jest.fn(),
            updateProduct: jest.fn(),
            deleteProduct: jest.fn()
        } as any;

        controller = new ProductController(mockService);

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
        };

        mockNext = jest.fn();
    });

    describe('getAllProducts', () => {
        it('debe retornar todos los productos cuando existen', async () => {
            const products: ProductDTO[] = [mockProduct];
            mockService.getAllProducts.mockResolvedValue(products);

            await controller.getAllProducts(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockService.getAllProducts).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(products);
        });

        it('debe retornar array vacio cuando no hay productos', async () => {
            mockService.getAllProducts.mockResolvedValue([]);

            await controller.getAllProducts(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith([]);
        });

        it('debe llamar a next con error cuando falla el servicio', async () => {
            const error = new Error('Error de base de datos');
            mockService.getAllProducts.mockRejectedValue(error);

            await controller.getAllProducts(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('getProductById', () => {
        it('debe retornar producto cuando existe', async () => {
            mockRequest.params = { id: '123' };
            mockService.getProductById.mockResolvedValue(mockProduct);

            await controller.getProductById(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockService.getProductById).toHaveBeenCalledWith('123');
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockProduct);
        });

        it('debe retornar 404 cuando producto no existe', async () => {
            mockRequest.params = { id: 'inexistente' };
            mockService.getProductById.mockResolvedValue(null);

            await controller.getProductById(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Producto no encontrado' });
        });

        it('debe llamar a next con error cuando falla el servicio', async () => {
            mockRequest.params = { id: '123' };
            const error = new Error('Error de conexion');
            mockService.getProductById.mockRejectedValue(error);

            await controller.getProductById(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('createProduct', () => {
        it('debe crear producto cuando datos son validos', async () => {
            const createData: CreateProductDTO = {
                name: 'Nueva Laptop',
                price: 1500,
                stock: 5,
                category: 'Electronics'
            };
            mockRequest.body = createData;
            mockService.createProduct.mockResolvedValue({ ...mockProduct, ...createData });

            await controller.createProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockService.createProduct).toHaveBeenCalledWith(createData);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
        });

        it('debe llamar a next con error cuando falla el servicio', async () => {
            const createData: CreateProductDTO = {
                name: 'Nueva Laptop',
                price: 1500,
                stock: 5,
                category: 'Electronics'
            };
            mockRequest.body = createData;
            const error = new Error('Nombre duplicado');
            mockService.createProduct.mockRejectedValue(error);

            await controller.createProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('updateProduct', () => {
        it('debe actualizar producto cuando existe', async () => {
            const updateData: UpdateProductDTO = {
                name: 'Laptop Actualizada',
                price: 1200,
                stock: 15,
                category: 'Electronics'
            };
            mockRequest.params = { id: '123' };
            mockRequest.body = updateData;
            mockService.updateProduct.mockResolvedValue({ ...mockProduct, ...updateData });

            await controller.updateProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockService.updateProduct).toHaveBeenCalledWith('123', updateData);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        it('debe retornar 404 cuando producto no existe', async () => {
            const updateData: UpdateProductDTO = {
                name: 'Producto Inexistente',
                price: 100,
                stock: 1,
                category: 'Test'
            };
            mockRequest.params = { id: 'inexistente' };
            mockRequest.body = updateData;
            mockService.updateProduct.mockResolvedValue(null);

            await controller.updateProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Producto no encontrado' });
        });

        it('debe llamar a next con error cuando falla el servicio', async () => {
            const updateData: UpdateProductDTO = {
                name: 'Producto',
                price: 100,
                stock: 1,
                category: 'Test'
            };
            mockRequest.params = { id: '123' };
            mockRequest.body = updateData;
            const error = new Error('Error de actualizacion');
            mockService.updateProduct.mockRejectedValue(error);

            await controller.updateProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteProduct', () => {
        it('debe eliminar producto cuando existe', async () => {
            mockRequest.params = { id: '123' };
            mockService.deleteProduct.mockResolvedValue();

            await controller.deleteProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockService.deleteProduct).toHaveBeenCalledWith('123');
            expect(mockResponse.status).toHaveBeenCalledWith(204);
        });

        it('debe llamar a next con error cuando falla el servicio', async () => {
            mockRequest.params = { id: '123' };
            const error = new Error('Error al eliminar');
            mockService.deleteProduct.mockRejectedValue(error);

            await controller.deleteProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
});