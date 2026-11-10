import { randomUUID } from 'crypto';

export class Product {
    public readonly id: string;
    public name: string;
    public price: number;
    public stock: number;
    public category: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(
        name: string,
        price: number,
        stock: number,
        category: string,
        id?: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        if (price < 0) {
            throw new Error('Price cannot be negative');
        }
        if (stock < 0) {
            throw new Error('Stock cannot be negative');
        }
        if (!name || name.trim().length === 0) {
            throw new Error('Name is required');
        }

        this.id = id || randomUUID();
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

    public updateDetails(name: string, price: number, stock: number, category: string): void {
        if (price < 0) {
            throw new Error('Price cannot be negative');
        }
        if (stock < 0) {
            throw new Error('Stock cannot be negative');
        }
        if (!name || name.trim().length === 0) {
            throw new Error('Name is required');
        }

        this.name = name;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.updatedAt = new Date();
    }
}