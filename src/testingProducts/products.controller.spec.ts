import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductI } from './products.interface';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
jest.mock('./products.service');

describe('TestingProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

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

  // it('Should be return a Books List (Use spyOn)', async () => {
  //   const result = [
  //     {
  //       id: '2',
  //       name: 'Stephen King: Corazones en la Atlántida',
  //       author: 'Lisa Rogak',
  //       editorial: 'Thomas Dunne Books',
  //     },
  //   ];
  //   jest.spyOn(service, 'findAll').mockResolvedValue(result);
  //   const res: Partial<Response> = {
  //     status: jest.fn(),
  //     json: jest.fn(),
  //   };

  //   const resultado = await controller.findAll(res as Response);
  // expect(resultado).toEqual(result);
  //   // let responseObject = {
  //   //   message: 'The Books list',
  //   //   result,
  //   //   statusCode: HttpStatus.OK,
  //   // };
  // });
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
