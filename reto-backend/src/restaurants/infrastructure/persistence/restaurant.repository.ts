import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IRestaurantRepository } from '../../domain/repositories/restaurant.repository';
import { Restaurant } from '../../domain/entities/restaurant.entity';
import { RestaurantORMEntity } from './restaurant.orm-entity';
import { RestaurantMapper } from '../mappers/restaurant.mapper';

@Injectable()
export class RestaurantRepository implements IRestaurantRepository {
  constructor(
    @InjectRepository(RestaurantORMEntity)
    private readonly repo: Repository<RestaurantORMEntity>
  ) {}

  async save(restaurant: Restaurant): Promise<Restaurant> {
    const restaurantToSave = RestaurantMapper.toPersistence(restaurant);
    const savedRestaurant = await this.repo.save(restaurantToSave);
    return RestaurantMapper.toDomain(savedRestaurant);
  }

  async findById(id: string): Promise<Restaurant | null> {
    const restaurant = await this.repo.findOne({ where: { id } });
    return restaurant ? RestaurantMapper.toDomain(restaurant) : null;
  }

  async findByOwnerId(ownerId: string): Promise<Restaurant[]> {
    const restaurants = await this.repo.find({ where: { ownerId } });
    return restaurants.map(RestaurantMapper.toDomain);
  }
}