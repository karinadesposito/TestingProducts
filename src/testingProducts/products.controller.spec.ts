import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductI } from "./products.interface";
// jest.mock('./products.service');
let controller: ProductsController;


describe('TestingProductsController', () => {

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be return a list of products', () => {
    expect(controller).toBeDefined();
  });





});
