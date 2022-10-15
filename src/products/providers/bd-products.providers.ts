
import { DataSource } from 'typeorm';
import { PRODUCT } from '../entities/bd-product.entity';

export const productProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PRODUCT),
    inject: ['DATA_SOURCE'],
  },
];