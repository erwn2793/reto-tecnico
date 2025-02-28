import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { ProductORMEntity } from './product.orm-entity';
import { ProductMapper } from '../mappers/product.mapper';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductORMEntity)
    private readonly productRepository: Repository<ProductORMEntity>
  ) {}

  async save(product: Product): Promise<Product> {
    const productToSave = ProductMapper.toPersistence(product);
    productToSave.id = uuidv4();
    const savedProduct = await this.productRepository.save(productToSave);
    return ProductMapper.toDomain(savedProduct);
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.productRepository.findOne({ where: { id } });
    return product ? ProductMapper.toDomain(product) : null;
  }

  async findByRestaurantId(restaurantId: string): Promise<Product[]> {
    const products = await this.productRepository.find({ where: { restaurantId } });
    return products.map(ProductMapper.toDomain);
  }

  async update(id: string, product: Partial<Product>): Promise<Product | null> {
    await this.productRepository.update(id, product);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    return products.map(ProductMapper.toDomain);
  }
}