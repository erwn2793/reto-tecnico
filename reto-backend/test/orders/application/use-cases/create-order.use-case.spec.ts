import { Test } from '@nestjs/testing';
import { CreateOrderUseCase } from '../../../../src/orders/application/use-cases/create-order.use-case';
import { OrderRepository } from '../../../../src/orders/infrastructure/persistence/order.repository';
import { CreateOrderDto } from '../../../../src/orders/application/dtos/create-order.dto';
import { Order } from '../../../../src/orders/domain/entities/order.entity';
import { OrderStatus } from '../../../../src/shared/types/status.type';

describe('CreateOrderUseCase', () => {
  let createOrderUseCase: CreateOrderUseCase;
  let orderRepository: OrderRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateOrderUseCase,
        {
          provide: 'IOrderRepository',  // Add the token here
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    createOrderUseCase = moduleRef.get<CreateOrderUseCase>(CreateOrderUseCase);
    orderRepository = moduleRef.get('IOrderRepository');
  });

  it('should create a new order', async () => {
    const dto: CreateOrderDto = {
      customerId: 'customer-123',
      restaurantId: 'restaurant-123',
      totalAmount: 29.99,
      items: [
        {
          productId: 'product-123',
          quantity: 2,
          price: 14.99
        }
      ]
    };

    const expectedOrder = new Order(
      '',
      dto.customerId,
      dto.restaurantId,
      OrderStatus.PENDING,
      dto.totalAmount,
      dto.items
    );

    jest.spyOn(orderRepository, 'save').mockResolvedValue(expectedOrder);

    const result = await createOrderUseCase.execute(dto);

    expect(result).toBeDefined();
    expect(result.customerId).toBe(dto.customerId);
    expect(result.restaurantId).toBe(dto.restaurantId);
    expect(result.status).toBe(OrderStatus.PENDING);
    expect(result.totalAmount).toBe(dto.totalAmount);
    expect(result.items).toEqual(dto.items);
    expect(orderRepository.save).toHaveBeenCalled();
  });
});