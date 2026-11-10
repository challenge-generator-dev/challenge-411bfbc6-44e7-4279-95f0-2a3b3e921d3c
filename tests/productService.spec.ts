import { ProductService } from '../src/services/productService';
import { IProductRepository } from '../src/repositories/productRepository';
import { ProductDTO, CreateProductDTO, UpdateProductDTO } from '../src/dto/productDTO';
import { NotFoundException, ValidationException } from '../src/exceptions/httpExceptions';

describe('ProductService', () => {
    let service: ProductService;
    let mockRepository: jest.Mocked<IProductRepository>;

    const mockProductDTO: ProductDTO = {
        id: '123',
        name: 'Laptop Pro',
        price: 1299.99,
        stock: 25,
        category: 'Electronics',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
    };

    beforeEach(() => {
        mockRepository = {
            getAll: jest.fn(),
            getById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            existsByName: jest.fn()
        } as unknown as jest.Mocked<IProductRepository>;

        service = new ProductService(mockRepository);
    });

    describe('getAllProducts', () => {
        it('debe retornar lista de productos', async () => {
            const products: ProductDTO[] = [mockProductDTO];
            mockRepository.getAll.mockResolvedValue(products);

            const result = await service.getAllProducts();

            expect(result).toEqual(products);
            expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
        });

        it('debe retornar array vacio si no hay productos', async () => {
            mockRepository.getAll.mockResolvedValue([]);

            const result = await service.getAllProducts();

            expect(result).toEqual([]);
            expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
        });

        it('debe propagar errores del repositorio', async () => {
            const error = new Error('Error de base de datos');
            mockRepository.getAll.mockRejectedValue(error);

            await expect(service.getAllProducts()).rejects.toThrow('Error de base de datos');
        });
    });

    describe('getProductById', () => {
        it('debe retornar producto cuando existe', async () => {
            mockRepository.getById.mockResolvedValue(mockProductDTO);

            const result = await service.getProductById('123');

            expect(result).toEqual(mockProductDTO);
            expect(mockRepository.getById).toHaveBeenCalledWith('123');
        });

        it('debe lanzar NotFoundException cuando producto no existe', async () => {
            mockRepository.getById.mockResolvedValue(null);

            await expect(service.getProductById('inexistente')).rejects.toThrow(NotFoundException);
        });

        it('debe validar formato de id', async () => {
            await expect(service.getProductById('')).rejects.toThrow(ValidationException);
            await expect(service.getProductById('   ')).rejects.toThrow(ValidationException);
        });
    });

    describe('createProduct', () => {
        const validCreateData: CreateProductDTO = {
            name: 'Nueva Laptop',
            price: 999.99,
            stock: 10,
            category: 'Electronics'
        };

        it('debe crear producto con datos validos', async () => {
            mockRepository.existsByName.mockResolvedValue(false);
            mockRepository.create.mockResolvedValue({ ...mockProductDTO, ...validCreateData });

            const result = await service.createProduct(validCreateData);

            expect(result.name).toBe(validCreateData.name);
            expect(result.price).toBe(validCreateData.price);
            expect(mockRepository.create).toHaveBeenCalledWith(validCreateData);
        });

        it('debe rechazar precio negativo', async () => {
            const invalidData = { ...validCreateData, price: -100 };

            await expect(service.createProduct(invalidData)).rejects.toThrow(ValidationException);
            expect(mockRepository.create).not.toHaveBeenCalled();
        });

        it('debe rechazar precio cero', async () => {
            const invalidData = { ...validCreateData, price: 0 };

            await expect(service.createProduct(invalidData)).rejects.toThrow(ValidationException);
        });

        it('debe rechazar nombre duplicado', async () => {
            mockRepository.existsByName.mockResolvedValue(true);

            await expect(service.createProduct(validCreateData)).rejects.toThrow(ValidationException);
            expect(mockRepository.create).not.toHaveBeenCalled();
        });

        it('debe rechazar nombre vacio', async () => {
            const invalidData = { ...validCreateData, name: '' };

            await expect(service.createProduct(invalidData)).rejects.toThrow(ValidationException);
        });

        it('debe rechazar nombre con solo espacios', async () => {
            const invalidData = { ...validCreateData, name: '   ' };

            await expect(service.createProduct(invalidData)).rejects.toThrow(ValidationException);
        });

        it('debe rechazar stock negativo', async () => {
            const invalidData = { ...validCreateData, stock: -5 };

            await expect(service.createProduct(invalidData)).rejects.toThrow(ValidationException);
        });

        it('debe rechazar categoria vacia', async () => {
            const invalidData = { ...validCreateData, category: '' };

            await expect(service.createProduct(invalidData)).rejects.toThrow(ValidationException);
        });

        it('debe propagar errores del repositorio', async () => {
            mockRepository.existsByName.mockResolvedValue(false);
            const error = new Error('Error de conexion');
            mockRepository.create.mockRejectedValue(error);

            await expect(service.createProduct(validCreateData)).rejects.toThrow(error);
        });
    });

    describe('updateProduct', () => {
        const validUpdateData: UpdateProductDTO = {
            name: 'Laptop Actualizada',
            price: 1499.99,
            stock: 30,
            category: 'Computacion'
        };

        it('debe actualizar producto cuando existe', async () => {
            const updatedProduct = { ...mockProductDTO, ...validUpdateData };
            mockRepository.getById.mockResolvedValue(mockProductDTO);
            mockRepository.existsByName.mockResolvedValue(false);
            mockRepository.update.mockResolvedValue(updatedProduct);

            const result = await service.updateProduct('123', validUpdateData);

            expect(result).toEqual(updatedProduct);
            expect(mockRepository.update).toHaveBeenCalledWith('123', validUpdateData);
        });

        it('debe lanzar NotFoundException cuando producto no existe', async () => {
            mockRepository.getById.mockResolvedValue(null);

            await expect(service.updateProduct('inexistente', validUpdateData)).rejects.toThrow(NotFoundException);
        });

        it('debe rechazar precio negativo', async () => {
            const invalidData = { ...validUpdateData, price: -50 };

            await expect(service.updateProduct('123', invalidData)).rejects.toThrow(ValidationException);
            expect(mockRepository.update).not.toHaveBeenCalled();
        });

        it('debe rechazar nombre duplicado en actualizacion', async () => {
            const existingProduct: ProductDTO = {
                id: '456',
                name: 'Otro Producto',
                price: 100,
                stock: 5,
                category: 'Test',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            mockRepository.getById.mockResolvedValue(mockProductDTO);
            mockRepository.existsByName.mockResolvedValue(true);

            await expect(service.updateProduct('123', validUpdateData)).rejects.toThrow(ValidationException);
        });

        it('debe permitir mismo nombre en actualizacion del mismo producto', async () => {
            const updateWithSameName = { ...validUpdateData, name: mockProductDTO.name };
            mockRepository.getById.mockResolvedValue(mockProductDTO);
            mockRepository.existsByName.mockImplementation(async (name: string, excludeId?: string) => {
                return name === mockProductDTO.name && excludeId === '123' ? false : true;
            });
            mockRepository.update.mockResolvedValue({ ...mockProductDTO, ...updateWithSameName });

            const result = await service.updateProduct('123', updateWithSameName);

            expect(result.name).toBe(mockProductDTO.name);
        });

        it('debe rechazar stock negativo', async () => {
            const invalidData = { ...validUpdateData, stock: -10 };

            await expect(service.updateProduct('123', invalidData)).rejects.toThrow(ValidationException);
        });

        it('debe rechazar nombre vacio', async () => {
            const invalidData = { ...validUpdateData, name: '' };

            await expect(service.updateProduct('123', invalidData)).rejects.toThrow(ValidationException);
        });
    });

    describe('deleteProduct', () => {
        it('debe eliminar producto cuando existe', async () => {
            mockRepository.getById.mockResolvedValue(mockProductDTO);
            mockRepository.delete.mockResolvedValue();

            await service.deleteProduct('123');

            expect(mockRepository.delete).toHaveBeenCalledWith('123');
        });

        it('debe lanzar NotFoundException cuando producto no existe', async () => {
            mockRepository.getById.mockResolvedValue(null);

            await expect(service.deleteProduct('inexistente')).rejects.toThrow(NotFoundException);
            expect(mockRepository.delete).not.toHaveBeenCalled();
        });

        it('debe validar formato de id', async () => {
            await expect(service.deleteProduct('')).rejects.toThrow(ValidationException);
        });

        it('debe propagar errores del repositorio', async () => {
            mockRepository.getById.mockResolvedValue(mockProductDTO);
            const error = new Error('Error de eliminacion');
            mockRepository.delete.mockRejectedValue(error);

            await expect(service.deleteProduct('123')).rejects.toThrow(error);
        });
    });
});