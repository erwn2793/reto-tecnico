import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductORMEntity } from './infrastructure/persistence/product.orm-entity';
import { GetRestaurantProductsUseCase } from './application/use-cases/get-restaurant-products.use-case';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { ProductController } from './infrastructure/controllers/product.controller';
import { ProductRepository } from './infrastructure/persistence/product.repository';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { GetProductsUseCase } from './application/use-cases/get-products.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductORMEntity]),
    RestaurantsModule
  ],
  controllers: [ProductController],
  providers: [
    {
      provide: 'IProductRepository',
      useClass: ProductRepository
    },
    CreateProductUseCase,
    GetRestaurantProductsUseCase,
    GetProductsUseCase,
  ],
  exports: ['IProductRepository'],
})
export class ProductsModule {}