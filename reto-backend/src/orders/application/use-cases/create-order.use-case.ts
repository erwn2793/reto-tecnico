import { IOrderRepository } from '../../domain/repositories/order.repository';
import { Order } from '../../domain/entities/order.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderStatus } from '../../../shared/types/status.type';
import { Inject } from '@nestjs/common';

export class CreateOrderUseCase {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository
  ) {}

  async execute(createOrder: CreateOrderDto) {
    const order = new Order('', createOrder.customerId, createOrder.restaurantId, OrderStatus.PENDING, createOrder.totalAmount, createOrder.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price
    })));
    return this.orderRepository.save(order);
  }
}