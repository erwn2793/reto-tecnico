import { Product } from '../../domain/entities/product.entity';
import { ProductORMEntity } from '../persistence/product.orm-entity';

export class ProductMapper {
  static toDomain(productOrm: ProductORMEntity): Product {
    return new Product(
      productOrm.id,
      productOrm.name,
      productOrm.price,
      productOrm.restaurantId
    );
  }

  static toPersistence(product: Product): ProductORMEntity {
    const productOrm = new ProductORMEntity();
    productOrm.name = product.name;
    productOrm.price = product.price;
    productOrm.restaurantId = product.restaurantId;
    return productOrm;
  }
}