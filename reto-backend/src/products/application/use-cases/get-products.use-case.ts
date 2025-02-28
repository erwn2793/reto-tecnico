import { IProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { Inject } from '@nestjs/common';

export class GetProductsUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository
  ) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}