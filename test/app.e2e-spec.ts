// import { HttpException, INestApplication } from '@nestjs/common';
// import { Test, TestingModule } from '@nestjs/testing';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';
// import { mock, mockReset } from " "moduleFileExtensions"
// ";
// import { AppService } from "module";import { ProductsService } from 'src/TestingProducts/products.service';

// describe('AppController (e2e)', () => {
//   const appServiceMock = simulacro<ProductsService>();

//   let app: INestApplication;

//   beforeAll (async () => {
//     const moduleFixture : TestingModule = await Test.createTestingModule({
//         imports :[AppModule],
//     })  
//     .overrideProvider(ProductsService)
//     .useValue(appServiceMock)
//     .compile();

//   app = moduleFixture.createNestApplication();
//   await app.init();
// });

// beforeEach(async()=>{
//     mockReset (appServiceMock);
// });

// afterAll (async()=>{
//     await app.close();
// })

// // it('/ (GET)', () => {
// //   return request(app.getHttpServer())
// //     .get('/')
// //     .expect(200)
// //     .expect('Hello World!');
// // });
// });
