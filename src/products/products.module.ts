import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ProductsController,
  PopularProductsController,
} from './products.controller';
import { productProviders } from './providers/bd-products.providers';
import { DatabaseModule } from 'src/db/typeorm/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController, PopularProductsController],
  providers: [
    ...productProviders,
   
    ProductsService
  ],
})
export class ProductsModule {}
