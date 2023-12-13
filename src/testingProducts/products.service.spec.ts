import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductI } from './products.interface';

global.fetch = jest.fn();

describe('ProductsService', () => {
  let productService: ProductsService;
  jest.mock('./products.service');
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    productService = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  it('should return an array of products', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue([{ id: '1', name: 'Product 1' }]),
    });

    const result = await productService.findAll();

    expect(fetch).toHaveBeenCalledWith('http://localhost:3030/products/');
    expect(result).toEqual([{ id: '1', name: 'Product 1' }]);
  });

  it('should return a product by id', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({ id: '1', name: 'Product 1' }),
    });

    const result = await productService.findProductById('1');

    expect(fetch).toHaveBeenCalledWith('http://localhost:3030/products/1');
    expect(result).toEqual({ id: '1', name: 'Product 1' });
  });

  it('should create a new product', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      status: 201, // 201 Created
      json: jest.fn().mockResolvedValue({
        id: '4',
        name: 'Ernest Hemingway: Viviendo la Vida al Máximo',
        author: 'Mary V. Dearborn',
        editorial: 'Knopf',
      }),
    });

    const newProductData = {
      id: '4',
      name: 'Ernest Hemingway: Viviendo la Vida al Máximo',
      author: 'Mary V. Dearborn',
      editorial: 'Knopf',
    };
    const resultado = await productService.createProduct({
      id: '4',
      name: 'Ernest Hemingway: Viviendo la Vida al Máximo',
      author: 'Mary V. Dearborn',
      editorial: 'Knopf',
    });
    expect(resultado).toEqual(newProductData);

    expect(fetch).toHaveBeenCalledWith('http://localhost:3030/products/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProductData),
    });

    expect(resultado).toEqual(newProductData);
  });
  it('should update an existing product', async () => {
    const existingProduct = {
      id: '4',
      name: 'Existing Product Name',
      author: 'Author',
      editorial: 'Editorial',
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValue(existingProduct),
    });
    const updatedProductData = {
      ...existingProduct,
      name: 'Updated Product Name',
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 200, // 200 OK
      json: jest.fn().mockResolvedValue(updatedProductData),
    });
    try {
      const result = await productService.updateProductById(
        '4',
        updatedProductData,
      );
      expect(fetch).toHaveBeenCalledWith('http://localhost:3030/products/4', {
        method: 'GET',
      });
      expect(fetch).toHaveBeenCalledWith('http://localhost:3030/products/4', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProductData),
      });
      expect(result).toEqual(updatedProductData);
    } catch (error) {
      expect(error.message).toBe('Error updating product');
    }
  });
  it('should delete an existing product', async () => {
    const deletedProduct = {
      id: '4',
      name: 'Product to be deleted',
      author: 'Author',
      editorial: 'Editorial',
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 204, 
      json: jest.fn().mockResolvedValue(deletedProduct),
    });
    try {
      const result = await productService.deleteProductById('4');
      expect(fetch).toHaveBeenCalledWith('http://localhost:3030/products/4', {
        method: 'DELETE',
      });
      expect(result).toEqual(deletedProduct);
    } catch (error) {
      expect(error.message).toBe('Error deleting product');
    }
  });
  it('should not return an expected object', async () => {
    // Creamos un objeto
    const expectedProduct = {
      id: '1',
      name: 'Product 1',
    };
  
    // Simulamos una respuesta de servicio que debe ser diferente
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        id: '2',
        name: 'Product 2',
      }),
    });
  
    // Pusimos un id diferente
    const result = await productService.findProductById('1');
  
    // not.ToBe no nos trae el objeto creado
    expect(result).not.toBe(expectedProduct);
  });
  

});
