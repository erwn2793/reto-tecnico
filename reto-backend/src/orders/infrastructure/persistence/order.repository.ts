import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../domain/entities/order.entity';
import { IOrderRepository } from '../../domain/repositories/order.repository';
import { v4 as uuidv4 } from 'uuid';
import { OrderORMEntity } from './order.orm-entity';
import { OrderMapper } from '../mappers/order.mapper';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(@InjectRepository(OrderORMEntity) private readonly orderRepository: Repository<OrderORMEntity>) {}

  async save(order: Order): Promise<Order> {
    try {
      const orderToSave = OrderMapper.toPersistence(order);
      orderToSave.id = uuidv4();
      const savedOrder = await this.orderRepository.save(orderToSave);
      return OrderMapper.toDomain(savedOrder);
    } catch (error) {
      console.log(error)
      throw new Error
    }
  }

  async findById(orderId: string): Promise<Order | null> {
    const orderOrm = await this.orderRepository.findOne({ where: { id: orderId } });
    return orderOrm ? OrderMapper.toDomain(orderOrm) : null;
  }

  async updateStatus(orderId: string, status: string): Promise<Order | null> {
    await this.orderRepository.update(orderId, { status } as Partial<OrderORMEntity>);
    return this.findById(orderId);
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepository.find();
    return orders.map(OrderMapper.toDomain);
  }
}