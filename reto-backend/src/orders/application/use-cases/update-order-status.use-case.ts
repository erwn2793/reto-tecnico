import { IOrderRepository } from '../../domain/repositories/order.repository';
import { OrdersGateway } from '../../../shared/websockets/orders.gateway';
import { OrderStatus } from 'src/shared/types/status.type';
import { Inject } from '@nestjs/common';

export class UpdateOrderStatusUseCase {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
    private readonly ordersGateway: OrdersGateway,
  ) {}

  async execute(orderId: string, status: OrderStatus) {
    const updatedOrder = await this.orderRepository.updateStatus(orderId, status);
    if (!updatedOrder) {
      throw new Error('Order not found');
    }
    this.ordersGateway.notifyOrderStatus(orderId, status);
    return updatedOrder;
  }
}