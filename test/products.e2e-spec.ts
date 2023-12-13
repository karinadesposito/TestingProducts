// import { Test, TestingModule } from '@nestjs/testing';
// // import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// // import { AppModule } from './../src/app.module';
// import { ProductModule } from './../src/testingProducts/products.module';
// import { ProductI } from './../src/testingProducts/products.interface';

// const data = Promise<ProductI[]>;
// describe('ProductsController (Integration)', () => {
//   let app: any;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [ProductModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   it('/GET', async () => {
//     const response = await request(app.getHttpServer()).get(
//       '/products/findAll');
  
//     expect(response.status).toBe(200);
//     expect(response).toBeInstanceOf(Promise<ProductI[]>);
//   });
// });


