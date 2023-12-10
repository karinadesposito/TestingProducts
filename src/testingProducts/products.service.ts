import { Injectable } from '@nestjs/common';
import { ProductI } from './products.interface';
import { ProductDto } from './products.dto';

const url = 'http://localhost:3030/products/';
@Injectable()
export class ProductsService {
  async findAll(): Promise<ProductI[]> {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (error) {
      throw error;
    }
  }
  async findProductById(id: string): Promise<ProductI> {
    try {
      const res = await fetch(url + id);
      if (res.status === 404) {
        throw new Error();
      }
      const data = await res.json();
      return await data;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(products: ProductI) {
    try {
      const newProduct = { ...products };
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async updateProductById(id: string, body: ProductI): Promise<ProductDto> {
    try {
      await this.findProductById(id);
      const upProduct = { ...body, id };
      await fetch(url + id, {
        method: 'Put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(upProduct),
      });

      return upProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductById(id: string): Promise<ProductI> {
    const res = await fetch(url + id, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error();
    }

    return await res.json();
  }
}
