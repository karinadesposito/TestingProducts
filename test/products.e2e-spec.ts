import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
// import { AppModule } from './../src/app.module';
import { ProductModule } from './../src/testingProducts/products.module';
import { ProductI } from './../src/testingProducts/products.interface';

const data = Promise<ProductI[]>;
describe('ProductsController (Integration)', () => {
  let app: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET', async () => {
    const response = await request(app.getHttpServer()).get(
      '/products/findAll');
  
    expect(response.status).toBe(200);
    expect(response).toBeInstanceOf(Promise<ProductI[]>);
  });
});

// it('/ (GET)', () => {
//   //     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });

// it('should create a new product', async () => {
//   const response = await request(app.getHttpServer())
//     .post('/products/create')
//     .send({
//       id: '15',
//       name: 'Más que humano',
//       author: 'G. Sturgeon',
//       editorial: 'Post',
//     });

//   expect(response.status).toBe(201);
//   expect(response.body).toEqual({
//     id: '15',
//     name: 'Más que humano',
//     author: 'G. Sturgeon',
//     editorial: 'Post',
//   });
// });

// it('should uodate a product', async () => {
//   const response = await request(app.getHttpServer())
//     .put('/products/15')
//     .send({
//       name: 'Humano',
//       author: 'G. Sturgeon',
//       editorial: 'put',
//     });

//   expect(response.status).toBe(201);
//   expect(response.body).toEqual({
//     id: '15',
//     name: 'Humano',
//     author: 'G. Sturgeon',
//     editorial: 'Put',
//   });

// it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
