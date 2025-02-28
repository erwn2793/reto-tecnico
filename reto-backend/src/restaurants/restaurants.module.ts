import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantORMEntity } from './infrastructure/persistence/restaurant.orm-entity';
import { RestaurantController } from './infrastructure/controllers/restaurant.controller';
import { RestaurantRepository } from './infrastructure/persistence/restaurant.repository';
import { RegisterRestaurantUseCase } from './application/use-cases/register-restaurant.use-case';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([RestaurantORMEntity]), UsersModule],
    controllers: [RestaurantController],
    providers: [
        {
          provide: 'IRestaurantRepository',
          useClass: RestaurantRepository
        },
        RegisterRestaurantUseCase
      ],
      exports: ['IRestaurantRepository'],
})
export class RestaurantsModule {}
