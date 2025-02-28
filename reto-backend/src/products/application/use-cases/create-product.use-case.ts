import { IProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { DatabaseException } from '../../../shared/exceptions/domain/domain.exceptions';
import { Inject } from '@nestjs/common';

export class CreateProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository
  ) {}

  async execute(dto: CreateProductDto): Promise<Product> {
    try {
      const product = new Product(
        '',
        dto.name,
        dto.price,
        dto.restaurantId
      );
      return await this.productRepository.save(product);
    } catch (error) {
      console.log(error)
      throw new DatabaseException('creating product');
    }
  }
}