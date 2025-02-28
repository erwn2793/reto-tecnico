import { Order, OrderItem } from '../../domain/entities/order.entity';
import { OrderORMEntity } from '../persistence/order.orm-entity';
import { OrderItemORMEntity } from '../persistence/order_items.orm-entity';

export class OrderMapper {
  static toDomain(orderOrm: OrderORMEntity): Order {
    const items: OrderItem[] = orderOrm.items?.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price
    })) || [];

    return new Order(
      orderOrm.id,
      orderOrm.customerId,
      orderOrm.restaurantId,
      orderOrm.status,
      orderOrm.totalAmount,
      items,
    );
  }

  static toPersistence(order: Order): OrderORMEntity {
    const orderOrm = new OrderORMEntity();
    orderOrm.id = order.id;
    orderOrm.customerId = order.customerId;
    orderOrm.restaurantId = order.restaurantId;
    orderOrm.status = order.status;
    orderOrm.totalAmount = order.totalAmount;
    
    orderOrm.items = order.items.map(item => {
      const orderItem = new OrderItemORMEntity();
      orderItem.productId = item.productId;
      orderItem.quantity = item.quantity;
      orderItem.price = item.price;
      orderItem.order = orderOrm;
      return orderItem;
    });

    return orderOrm;
  }
}