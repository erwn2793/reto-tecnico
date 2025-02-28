import { IRestaurantRepository } from '../../domain/repositories/restaurant.repository';
import { Restaurant } from '../../domain/entities/restaurant.entity';
import { CreateRestaurantDto } from '../dtos/create-restaurant.dto';
import { DuplicateEntityException, InternalServerException } from '../../../shared/exceptions/domain/domain.exceptions';
import { Inject } from '@nestjs/common';

export class RegisterRestaurantUseCase {
  constructor(
    @Inject ('IRestaurantRepository') private readonly restaurantRepository: IRestaurantRepository) {}

  async execute(dto: CreateRestaurantDto): Promise<Restaurant> {
    try {
      const restaurant = new Restaurant(
        dto.ownerId,
        dto.name,
        dto.address,
        dto.phone
      );
      return await this.restaurantRepository.save(restaurant);
    } catch (error) {
      console.log(error);
      if (error instanceof DuplicateEntityException) {
        throw error;
      }
      throw new InternalServerException('Error registering restaurant');
    }
  }
}