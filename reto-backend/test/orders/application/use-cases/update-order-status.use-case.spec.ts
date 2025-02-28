import { Test } from '@nestjs/testing';
import { UpdateOrderStatusUseCase } from '../../../../src/orders/application/use-cases/update-order-status.use-case';
import { Order } from '../../../../src/orders/domain/entities/order.entity';
import { OrderRepository } from '../../../../src/orders/infrastructure/persistence/order.repository';
import { OrdersGateway } from '../../../../src/shared/websockets/orders.gateway';
import { OrderStatus } from '../../../../src/shared/types/status.type';

describe('UpdateOrderStatusUseCase', () => {
  let updateOrderStatusUseCase: UpdateOrderStatusUseCase;
  let orderRepository: OrderRepository;
  let ordersGateway: OrdersGateway;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateOrderStatusUseCase,
        {
          provide: 'IOrderRepository',
          useValue: {
            updateStatus: jest.fn(),
            findById: jest.fn(),
          },
        },
        {
          provide: OrdersGateway,
          useValue: {
            notifyOrderStatus: jest.fn(),
          },
        },
      ],
    }).compile();

    updateOrderStatusUseCase = moduleRef.get<UpdateOrderStatusUseCase>(UpdateOrderStatusUseCase);
    orderRepository = moduleRef.get('IOrderRepository');
    ordersGateway = moduleRef.get<OrdersGateway>(OrdersGateway);
  });

  it('should update order status and notify via websocket', async () => {
    const orderId = 'order-123';
    const newStatus = OrderStatus.PREPARING;
    const updatedOrder = new Order(
      orderId,
      'customer-123',
      'restaurant-123',
      newStatus,
      29.99,
      [{
        productId: 'product-123',
        quantity: 2,
        price: 14.99
      }]
    );

    jest.spyOn(orderRepository, 'updateStatus').mockResolvedValue(updatedOrder);

    const result = await updateOrderStatusUseCase.execute(orderId, newStatus);

    expect(result).toBeDefined();
    expect(result.status).toBe(newStatus);
    expect(orderRepository.updateStatus).toHaveBeenCalledWith(orderId, newStatus);
    expect(ordersGateway.notifyOrderStatus).toHaveBeenCalledWith(orderId, newStatus);
  });

  it('should throw error when order is not found', async () => {
    const orderId = 'non-existent-order';
    jest.spyOn(orderRepository, 'updateStatus').mockResolvedValue(null);

    await expect(updateOrderStatusUseCase.execute(orderId, OrderStatus.PREPARING))
      .rejects
      .toThrow('Order not found');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});