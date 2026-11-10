import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { ProductDTO, CreateProductDTO, UpdateProductDTO } from '../dto/productDTO';
import { BadRequestError, NotFoundError } from '../exceptions/httpExceptions';
import { InMemoryProductRepository } from '../repositories/productRepository';

export class ProductController {
    private productService: ProductService;

    constructor() {
        const repository = new InMemoryProductRepository();
        this.productService = new ProductService(repository);
    }

    public async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products: ProductDTO[] = await this.productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            throw error;
        }
    }

    public async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            if (!id) {
                throw new BadRequestError('El ID del producto es requerido');
            }

            const product: ProductDTO | null = await this.productService.getProductById(id);
            
            if (!product) {
                throw new NotFoundError(`Producto con ID '${id}' no encontrado`);
            }

            res.status(200).json(product);
        } catch (error) {
            throw error;
        }
    }

    public async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const productData: CreateProductDTO = req.body;

            if (!productData.name || productData.name.trim() === '') {
                throw new BadRequestError('El nombre del producto es requerido');
            }

            if (productData.price === undefined || productData.price === null) {
                throw new BadRequestError('El precio del producto es requerido');
            }

            if (typeof productData.price !== 'number' || productData.price < 0) {
                throw new BadRequestError('El precio debe ser un número no negativo');
            }

            if (productData.stock !== undefined && (typeof productData.stock !== 'number' || productData.stock < 0)) {
                throw new BadRequestError('El stock debe ser un número no negativo');
            }

            const newProduct: ProductDTO = await this.productService.createProduct(productData);
            res.status(201).json(newProduct);
        } catch (error) {
            throw error;
        }
    }

    public async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const productData: UpdateProductDTO = req.body;

            if (!id) {
                throw new BadRequestError('El ID del producto es requerido');
            }

            const existingProduct = await this.productService.getProductById(id);
            if (!existingProduct) {
                throw new NotFoundError(`Producto con ID '${id}' no encontrado`);
            }

            if (productData.name !== undefined) {
                if (productData.name.trim() === '') {
                    throw new BadRequestError('El nombre del producto no puede estar vacío');
                }
            }

            if (productData.price !== undefined) {
                if (typeof productData.price !== 'number' || productData.price < 0) {
                    throw new BadRequestError('El precio debe ser un número no negativo');
                }
            }

            if (productData.stock !== undefined && (typeof productData.stock !== 'number' || productData.stock < 0)) {
                throw new BadRequestError('El stock debe ser un número no negativo');
            }

            const updatedProduct: ProductDTO | null = await this.productService.updateProduct(id, productData);
            
            if (!updatedProduct) {
                throw new NotFoundError(`Producto con ID '${id}' no encontrado`);
            }

            res.status(200).json(updatedProduct);
        } catch (error) {
            throw error;
        }
    }

    public async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;

            if (!id) {
                throw new BadRequestError('El ID del producto es requerido');
            }

            const existingProduct = await this.productService.getProductById(id);
            if (!existingProduct) {
                throw new NotFoundError(`Producto con ID '${id}' no encontrado`);
            }

            await this.productService.deleteProduct(id);
            res.status(204).send();
        } catch (error) {
            throw error;
        }
    }
}