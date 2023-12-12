import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
// import { ProductI } from './products.interface';

global.fetch = jest.fn();

describe('ProductsService', () => {
  let productService: ProductsService;

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

  it('findAll should fetch products', async () => {
    // Configurar el mock de fetch
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue([{ id: '1', name: 'Product 1' }]),
    });

    const result = await productService.findAll();

    expect(fetch).toHaveBeenCalledWith('http://localhost:3030/products/');
    expect(result).toEqual([{ id: '1', name: 'Product 1' }]);
  });

  it('findProductById should fetch product by id', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({ id: '1', name: 'Product 1' }),
    });

    const result = await productService.findProductById('1');

    expect(fetch).toHaveBeenCalledWith('http://localhost:3030/products/1');
    expect(result).toEqual({ id: '1', name: 'Product 1' });
  });

  it('createProduct should create a new product', async () => {
    // Configurar el mock de fetch
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
    const result = await productService.createProduct({});

    expect(fetch).toHaveBeenCalledWith('http://localhost:3030/products/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProductData),
    });

    expect(result).toEqual(newProductData);
  });
});
