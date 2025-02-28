import { Restaurant } from '../entities/restaurant.entity';

export interface IRestaurantRepository {
  save(restaurant: Restaurant): Promise<Restaurant>;
  findById(id: string): Promise<Restaurant | null>;
  findByOwnerId(ownerId: string): Promise<Restaurant[]>;
}