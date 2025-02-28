import { IProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { Inject } from '@nestjs/common';

export class GetRestaurantProductsUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository
  ) {}

  async execute(restaurantId: string): Promise<Product[]> {
    return this.productRepository.findByRestaurantId(restaurantId);
  }
}
