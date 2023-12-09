import { Module } from '@nestjs/common';
import { ProductModule } from './TestingProducts/products.module';

@Module({
  imports: [ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
