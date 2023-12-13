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

  async updateProductById(id: string, product: ProductI): Promise<ProductI> {
    const res = await fetch(url + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      throw new Error('Error updating product');
    }
    return await res.json();
  }
  async deleteProductById(id: string): Promise<ProductI | undefined> {
    const res = await fetch(url + id, {
      method: 'DELETE',
    });
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('Product not found');
      } else {
        throw new Error('Error deleting product');
      }
    }
   
     return res.status === 204 ? undefined : await res.json();
  }
}
