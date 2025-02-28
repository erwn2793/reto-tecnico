import { Order } from '../entities/order.entity';

export interface IOrderRepository {
  save(order: Order): Promise<Order>;
  findById(orderId: string): Promise<Order | null>;
  updateStatus(orderId: string, status: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
}