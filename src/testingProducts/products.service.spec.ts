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

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const mockProducts: ProductI[] = [{ id: '1', name: 'Product 1', author: 'Manuel', editorial:'Ediciones La Flor' }];

      // Utiliza spyOn para crear un espía en el método fetch
      const fetchSpy = jest.spyOn(global, 'fetch');
      fetchSpy.mockResolvedValueOnce({
        
      } as Response);
      const result = await productService.findAll();

      expect(result).toEqual(mockProducts);

      // Restaura el espía después de la prueba
      fetchSpy.mockRestore();
    });

    it('should throw an error on API failure', async () => {
      // Utiliza spyOn para crear un espía en el método fetch
      const fetchSpy = jest.spyOn(global, 'fetch');
      fetchSpy.mockRejectedValueOnce(new Error('API Error'));

      await expect(productService.findAll()).rejects.toBe('API Error');

      // Restaura el espía después de la prueba
      fetchSpy.mockRestore();
    });
  });

  // Puedes continuar con pruebas similares para los demás métodos del servicio

});

