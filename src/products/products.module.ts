import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ProductsController,
  PopularProductsController,
} from './products.controller';
import { productProviders } from './providers/bd-products.providers';


@Module({
  imports: [],
  controllers: [ProductsController, PopularProductsController],
  providers: [
    ProductsService
  ],
})
export class ProductsModule {}
