import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductI } from "./products.interface";
import { Response } from '@nestjs/common';

jest.mock('./products.service');
let controller: ProductsController;
let service: ProductsService;


describe('TestingProductsController', () => {

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(ProductsController).toBeDefined();
  });

it ('Should be return a Books List (Use spyOn)', async()=>{
const result = 'Books';

jest.spyOn(service , 'findAll').mockImplementation(()=>Promise<Product );

const booksList = await controller.findAll(Promise);

expect(controller.findAll).toBe(result)
})
});



  // it('should get the books list', () => {
  //   const data=  ;
  //   const result = controller.findAll(data)
  //   expect(controller).toBe(result);
  // });

  // it('', () => {
  //   expect(controller).
  //   ;
  // });

  // it('', () => {
  //   expect(controller).
  //   ;
  // });

  // it('', () => {
  //   expect(controller).
  //   ;
  // });



