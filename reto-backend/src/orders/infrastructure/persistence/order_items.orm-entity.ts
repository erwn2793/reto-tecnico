import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderORMEntity } from "./order.orm-entity";
import { ProductORMEntity } from "../../../products/infrastructure/persistence/product.orm-entity";

@Entity('order_items')
export class OrderItemORMEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ name: 'orderId' })
  orderId: string;

  @Column({ name: 'productId' })
  productId: string;

  @ManyToOne(() => OrderORMEntity, { nullable: false })
  @JoinColumn({ name: 'orderId' })
  order: OrderORMEntity;

  @ManyToOne(() => ProductORMEntity, { nullable: false })
  @JoinColumn({ name: 'productId' })
  product: ProductORMEntity;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}