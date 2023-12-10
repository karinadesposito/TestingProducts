import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductI } from './products.interface';
import { Response } from 'express';
import { ProductDto } from './products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  async findAll(@Res() res: Response): Promise<Response<ProductI[]>> {
    try {
      const prodResp = await this.productsService.findAll();
      return res.status(HttpStatus.OK).send({
        message: 'The Books list',
        prodResp,
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      throw new NotFoundException('Data not found');
    }
  }
  @Get(':id')
  async findProductById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response<ProductI>> {
    try {
      const dataProduct = await this.productsService.findProductById(id);
      return res
        .status(HttpStatus.OK)
        .send({
          message: 'Product found',
          dataProduct,
          statusCode: HttpStatus.OK,
        });
    } catch (error) {
      throw new NotFoundException(`Product with'${id}' does not exists`);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createProduct(
    @Body() body: ProductDto,
    @Res() res: Response,
  ): Promise<Response<ProductDto>> {
    try {
      const newProduct = await this.productsService.createProduct(body);
      return res
        .status(HttpStatus.CREATED)
        .json({
          message: `The product was created `,
          newProduct,
          statusCode: HttpStatus.CREATED,
        });
    } catch (error) {
      throw new BadRequestException('Product was not created');
    }
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteProductById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<ProductI>> {
    try {
      const deleteProd = await this.productsService.deleteProductById(id);
      if (deleteProd) {
        return res
          .status(HttpStatus.OK)
          .send({
            message: `The product with id ${id} was deleted`,
            statusCode: HttpStatus.OK,
          });
      }
    } catch (error) {
      throw new NotFoundException('Deleted Failed');
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateProductById(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: ProductDto,
  ): Promise<Response<ProductDto>> {
    try {
      const updatedProduct = await this.productsService.updateProductById(
        id,
        body,
      );
      return res
        .status(HttpStatus.OK)
        .json({
          message: `The product was updated `,
          updatedProduct,
          statusCode: HttpStatus.OK,
        });
    } catch (error) {
      throw new BadRequestException(`Product with'${id}' was not updated`);
    }
  }
}
