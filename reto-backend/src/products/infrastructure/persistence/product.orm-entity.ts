import { BaseEntity } from '../../../database/base.entity';
import { RestaurantORMEntity } from '../../../restaurants/infrastructure/persistence/restaurant.orm-entity';
import { Entity, PrimaryGeneratedColumn, Column, Generated, ManyToOne, JoinColumn } from 'typeorm';

@Entity('products')
export class ProductORMEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'restaurantId' })
  restaurantId: string;

  @ManyToOne(() => RestaurantORMEntity, { nullable: false })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: RestaurantORMEntity;
}