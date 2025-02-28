import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './infrastructure/persistence/order.repository';
import { OrderController } from './infrastructure/controllers/order.controller';
import { CreateOrderUseCase } from './application/use-cases/create-order.use-case';
import { UpdateOrderStatusUseCase } from './application/use-cases/update-order-status.use-case';
import { OrdersGateway } from '../shared/websockets/orders.gateway';
import { OrderORMEntity } from './infrastructure/persistence/order.orm-entity';
import { UsersModule } from 'src/users/users.module';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderORMEntity]), UsersModule, RestaurantsModule],
  controllers: [OrderController],
  providers: [
    {
      provide: 'IOrderRepository',
      useClass: OrderRepository
    },
    CreateOrderUseCase,
    UpdateOrderStatusUseCase,
    OrdersGateway,
  ],
  exports: ['IOrderRepository']
})
export class OrdersModule {}