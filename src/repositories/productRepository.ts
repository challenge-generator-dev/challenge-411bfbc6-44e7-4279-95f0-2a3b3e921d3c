import { Product } from '../models/productModel';
import { ProductDTO, CreateProductDTO, UpdateProductDTO } from '../dto/productDTO';

export interface IProductRepository {
    getAll(): Promise<ProductDTO[]>;
    getById(id: string): Promise<ProductDTO | null>;
    create(productData: CreateProductDTO): Promise<ProductDTO>;
    update(id: string, productData: UpdateProductDTO): Promise<ProductDTO | null>;
    delete(id: string): Promise<void>;
    existsByName(name: string, excludeId?: string): Promise<boolean>;
}

export class InMemoryProductRepository implements IProductRepository {
    private products: Product[] = [];

    async getAll(): Promise<ProductDTO[]> {
        return this.products.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: product.category,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }));
    }

    async getById(id: string): Promise<ProductDTO | null> {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            return null;
        }
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: product.category,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };
    }

    async create(productData: CreateProductDTO): Promise<ProductDTO> {
        const product = new Product(
            productData.name,
            productData.price,
            productData.stock,
            productData.category
        );
        this.products.push(product);
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: product.category,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };
    }

    async update(id: string, productData: UpdateProductDTO): Promise<ProductDTO | null> {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            return null;
        }

        const existingProduct = this.products[productIndex];
        const updatedName = productData.name !== undefined ? productData.name : existingProduct.name;
        const updatedPrice = productData.price !== undefined ? productData.price : existingProduct.price;
        const updatedStock = productData.stock !== undefined ? productData.stock : existingProduct.stock;
        const updatedCategory = productData.category !== undefined ? productData.category : existingProduct.category;

        existingProduct.updateDetails(updatedName, updatedPrice, updatedStock, updatedCategory);

        return {
            id: existingProduct.id,
            name: existingProduct.name,
            price: existingProduct.price,
            stock: existingProduct.stock,
            category: existingProduct.category,
            createdAt: existingProduct.createdAt,
            updatedAt: existingProduct.updatedAt
        };
    }

    async delete(id: string): Promise<void> {
        this.products = this.products.filter(p => p.id !== id);
    }

    async existsByName(name: string, excludeId?: string): Promise<boolean> {
        return this.products.some(p => p.name === name && p.id !== excludeId);
    }
}