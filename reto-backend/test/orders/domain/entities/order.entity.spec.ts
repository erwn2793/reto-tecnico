import { OrderStatus } from '../../../../src/shared/types/status.type';
import { Order, OrderItem } from '../../../../src/orders/domain/entities/order.entity';
import { InvalidInputException } from '../../../../src/shared/exceptions/domain/domain.exceptions';
import { v4 as uuidv4 } from 'uuid';

describe('Order Entity', () => {
  let order: Order;
  const orderId = uuidv4();
  const customerId = uuidv4();
  const restaurantId = uuidv4();
  const validItems: OrderItem[] = [
    {
      productId: uuidv4(),
      quantity: 2,
      price: 14.99
    }
  ];
  const totalAmount = 29.98;

  beforeEach(() => {
    order = new Order(
      orderId,
      customerId,
      restaurantId,
      OrderStatus.PENDING,
      totalAmount,
      validItems
    );
  });

  describe('Order Status Transitions', () => {
    it('should allow transition from pending to preparing', () => {
      order.updateStatus(OrderStatus.PREPARING);
      expect(order.status).toBe(OrderStatus.PREPARING);
    });

    it('should allow transition from preparing to completed', () => {
      order.updateStatus(OrderStatus.PREPARING);
      order.updateStatus(OrderStatus.COMPLETED);
      expect(order.status).toBe(OrderStatus.COMPLETED);
    });

    it('should throw error when invalid transition is attempted', () => {
      expect(() => {
        order.updateStatus(OrderStatus.COMPLETED);
      }).toThrow(InvalidInputException);
    });
  });

  describe('Order Creation', () => {
    it('should create order with valid data', () => {
      const newOrder = new Order(
        orderId,
        customerId,
        restaurantId,
        OrderStatus.PENDING,
        totalAmount,
        validItems
      );
      expect(newOrder.id).toBe(orderId);
      expect(newOrder.status).toBe(OrderStatus.PENDING);
      expect(newOrder.totalAmount).toBe(totalAmount);
      expect(newOrder.items).toEqual(validItems);
    });

    it('should throw error when creating order without required fields', () => {
      expect(() => {
        new Order(
          orderId,
          '',
          restaurantId,
          OrderStatus.PENDING,
          totalAmount,
          validItems
        );
      }).toThrow(InvalidInputException);
    });

    it('should throw error when creating order with negative total amount', () => {
      expect(() => {
        new Order(
          orderId,
          customerId,
          restaurantId,
          OrderStatus.PENDING,
          -10,
          validItems
        );
      }).toThrow(InvalidInputException);
    });

    it('should throw error when creating order without items', () => {
      expect(() => {
        new Order(
          orderId,
          customerId,
          restaurantId,
          OrderStatus.PENDING,
          totalAmount,
          []
        );
      }).toThrow(InvalidInputException);
    });

    it('should throw error when creating order with invalid item quantity', () => {
      const invalidItems: OrderItem[] = [
        {
          productId: uuidv4(),
          quantity: 0,
          price: 14.99
        }
      ];

      expect(() => {
        new Order(
          orderId,
          customerId,
          restaurantId,
          OrderStatus.PENDING,
          totalAmount,
          invalidItems
        );
      }).toThrow(InvalidInputException);
    });

    it('should throw error when creating order with negative item price', () => {
      const invalidItems: OrderItem[] = [
        {
          productId: uuidv4(),
          quantity: 2,
          price: -14.99
        }
      ];

      expect(() => {
        new Order(
          orderId,
          customerId,
          restaurantId,
          OrderStatus.PENDING,
          totalAmount,
          invalidItems
        );
      }).toThrow(InvalidInputException);
    });
  });
});