import { validate } from 'class-validator';
import { ProductDto } from './products.dto';

describe('ProductDto', () => {
  it('should be defined and valid with valid data', async () => {
    const productDto = new ProductDto();
    productDto.id = '123';
    productDto.name = 'Sample Book';
    productDto.author = 'John Doe';
    productDto.editorial = 'Sample Editorial';

    const errors = await validate(productDto);
    expect(errors.length).toBe(0);
    expect(productDto).toBeDefined();
  });

  it('should be defined and fail with invalid data', async () => {
    const productDto = new ProductDto();

    const errors = await validate(productDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(productDto).toBeDefined();
  });
});
