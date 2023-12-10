import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductI } from './products.interface';

describe('ProductsService', () => {
  let productService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    productService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  it('should return a List of products', () => {
    const result = productService.findAll();
    expect(result).toBeInstanceOf(Promise<ProductI[]>);
  });

  it('should not return a List of products', () => {
    const url = 'http://localhost:3030/products/';
    const result = !url;
    expect(result).not.toBe(Promise<ProductI[]>);
  });

  it('should return a product', () => {
    const result = productService.findProductById('4');
    expect(result).toBeInstanceOf(
      Promise<{
        id: '4';
        name: 'Ernest Hemingway: Viviendo la Vida al Máximo';
        author: 'Mary V. Dearborn';
        editorial: 'Knopf';
      }>,
    );
  });

  it('should create a product', () => {    
    const result = productService.createProduct(
    {
      id: '1',
      name: 'la guerra de los mundos',
      author: 'H.G.Wells',
      editorial: 'Knopf'
    });
    expect(result).toBeInstanceOf(Promise<ProductI>);
  });

  it('should update a product', () => {
    const result = productService.updateProductById('5',{
      id: '5',
      name: 'Ernest Hemingway: Viviendo la Vida al Máximo',
      author: 'José Perez',
      editorial: 'Knopf'
    });
    expect(result).toBeInstanceOf(Promise);
    });
  });
