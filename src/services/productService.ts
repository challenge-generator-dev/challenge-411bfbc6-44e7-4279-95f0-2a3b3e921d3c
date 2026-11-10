import { ProductDTO, CreateProductDTO, UpdateProductDTO } from '../dto/productDTO';
import { IProductRepository } from '../repositories/productRepository';
import { BadRequestError, NotFoundError } from '../exceptions/httpExceptions';

export class ProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async getAllProducts(): Promise<ProductDTO[]> {
    return await this.productRepository.getAll();
  }

  async getProductById(id: string): Promise<ProductDTO> {
    const product = await this.productRepository.getById(id);
    if (!product) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    return product;
  }

  async createProduct(productData: CreateProductDTO): Promise<ProductDTO> {
    this.validateProductData(productData);
    await this.validateUniqueName(productData.name);
    return await this.productRepository.create(productData);
  }

  async updateProduct(id: string, productData: UpdateProductDTO): Promise<ProductDTO> {
    const existingProduct = await this.productRepository.getById(id);
    if (!existingProduct) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    if (productData.name && productData.name !== existingProduct.name) {
      await this.validateUniqueName(productData.name, id);
    }
    const validatedData = this.sanitizeUpdateData(productData, existingProduct);
    const updatedProduct = await this.productRepository.update(id, validatedData);
    if (!updatedProduct) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.productRepository.getById(id);
    if (!product) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    await this.productRepository.delete(id);
  }

  private validateProductData(productData: CreateProductDTO): void {
    if (productData.price < 0) {
      throw new BadRequestError('Price cannot be negative');
    }
    if (productData.stock < 0) {
      throw new BadRequestError('Stock cannot be negative');
    }
    if (!productData.name || productData.name.trim().length === 0) {
      throw new BadRequestError('Product name is required');
    }
    if (!productData.category || productData.category.trim().length === 0) {
      throw new BadRequestError('Product category is required');
    }
  }

  private async validateUniqueName(name: string, excludeId?: string): Promise<void> {
    const exists = await this.productRepository.existsByName(name, excludeId);
    if (exists) {
      throw new BadRequestError(`Product with name '${name}' already exists`);
    }
  }

  private sanitizeUpdateData(
    updateData: UpdateProductDTO,
    existingProduct: ProductDTO
  ): UpdateProductDTO {
    const sanitized: UpdateProductDTO = {};
    if (updateData.name !== undefined) {
      if (updateData.name.trim().length === 0) {
        throw new BadRequestError('Product name cannot be empty');
      }
      sanitized.name = updateData.name.trim();
    }
    if (updateData.price !== undefined) {
      if (updateData.price < 0) {
        throw new BadRequestError('Price cannot be negative');
      }
      sanitized.price = updateData.price;
    }
    if (updateData.stock !== undefined) {
      if (updateData.stock < 0) {
        throw new BadRequestError('Stock cannot be negative');
      }
      sanitized.stock = updateData.stock;
    }
    if (updateData.category !== undefined) {
      if (updateData.category.trim().length === 0) {
        throw new BadRequestError('Product category cannot be empty');
      }
      sanitized.category = updateData.category.trim();
    }
    return sanitized;
  }
}