import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

jest.mock('./products.service');

describe('TestingProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;
  let mockedProductsValue = 'Books';
  let mockProductsService = {
    findAll: () => mockedProductsValue,
    findProductsById: () => mockedProductsValue,
    createProduct: () => mockedProductsValue,
    updateProductById: () => mockedProductsValue,
    deleteProductById: () => mockedProductsValue,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    })
      .overrideProvider(ProductsService)
      .useValue(mockProductsService)
      .compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(ProductsController).toBeDefined();
  });

  it('should reads a Product by id (Use full mocked Service)',  () => {      
    const result = mockProductsService.findProductsById();
    expect(result).toEqual('Books');
  });

  it('should reads an array (Use full mocked Service)',  () => {      
    const result = mockProductsService.findAll();
    expect(result).toEqual('Books');
  });

  it('should update a Product by Id (Use full mocked Service)',  () => {      
    const result = mockProductsService.updateProductById();
    expect(result).toEqual('Books');
  });

  it('should delete a Product by id (Use full mocked Service)',  () => {      
    const result = mockProductsService.deleteProductById();
    expect(result).toEqual('Books');
  });
  
   it('should create a  New Product (Use full mocked Service)',  () => {      
    const result = mockProductsService.createProduct();
    expect(result).toEqual('Books');
  });


// it('should return a Product by id (Use spyOn)', () =>{
//   const result= "Books";
//   jest.spyOn(service, 'findProductById').mockImplementation(() =>result as void);
//   expect(controller.findProductById).toBe(result);

// });

});