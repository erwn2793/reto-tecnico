import { Restaurant } from '../../domain/entities/restaurant.entity';
import { RestaurantORMEntity } from '../persistence/restaurant.orm-entity';

export class RestaurantMapper {
  static toDomain(restaurantOrm: RestaurantORMEntity): Restaurant {
    return new Restaurant(
      restaurantOrm.ownerId,
      restaurantOrm.name,
      restaurantOrm.address,
      restaurantOrm.phone,
    );
  }

  static toPersistence(restaurant: Restaurant): RestaurantORMEntity {
    const restaurantOrm = new RestaurantORMEntity();
    restaurantOrm.ownerId = restaurant.ownerId;
    restaurantOrm.name = restaurant.name;
    restaurantOrm.address = restaurant.address;
    restaurantOrm.phone = restaurant.phone;
    return restaurantOrm;
  }
}