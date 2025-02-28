import { Product } from '../entities/product.entity';

export interface IProductRepository {
  save(product: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  findByRestaurantId(restaurantId: string): Promise<Product[]>;
  update(id: string, product: Partial<Product>): Promise<Product | null>;
  delete(id: string): Promise<void>;
}