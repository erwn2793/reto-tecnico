import { BaseEntity } from '../../../database/base.entity';
import { RestaurantORMEntity } from '../../../restaurants/infrastructure/persistence/restaurant.orm-entity';
import { OrderStatus } from '../../../shared/types/status.type';
import { UserORMEntity } from '../../../users/infrastructure/persistence/user.orm-entity';
import { Entity, PrimaryGeneratedColumn, Column, Generated, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { OrderItemORMEntity } from './order_items.orm-entity';

@Entity('orders')
export class OrderORMEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ name: 'customerId' })
  customerId: string;

  @Column({ name: 'restaurantId' })
  restaurantId: string;

  @ManyToOne(() => UserORMEntity, { nullable: false })
  @JoinColumn({ name: 'customerId' })
  customer: UserORMEntity;

  @ManyToOne(() => RestaurantORMEntity, { nullable: false })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: RestaurantORMEntity;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING
  })
  status: OrderStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @OneToMany(() => OrderItemORMEntity, orderItem => orderItem.order, {
    cascade: true,
    eager: true
  })
  items: OrderItemORMEntity[];
}