import { InvalidInputException } from "../../../shared/exceptions/domain/domain.exceptions";
import { OrderStatus } from "../../../shared/types/status.type";

export type OrderItem = {
  productId: string;
  quantity: number;
  price: number;
};

export class Order {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly restaurantId: string,
    public status: OrderStatus,
    public readonly totalAmount: number,
    public readonly items: OrderItem[]
  ) {
    this.validateOrder();
  }

  updateStatus(newStatus: OrderStatus): void {
    if (!this.isValidStatusTransition(newStatus)) {
      throw new InvalidInputException(`Invalid status transition from ${this.status} to ${newStatus}`);
    }
    this.status = newStatus;
  }

  private isValidStatusTransition(newStatus: OrderStatus): boolean {
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.PREPARING],
      [OrderStatus.PREPARING]: [OrderStatus.COMPLETED],
      [OrderStatus.COMPLETED]: []
    };

    return validTransitions[this.status]?.includes(newStatus) ?? false;
  }

  private validateOrder(): void {
    if (!this.customerId || !this.restaurantId) {
      throw new InvalidInputException('Customer ID and Restaurant ID are required');
    }

    if (this.totalAmount < 0) {
      throw new InvalidInputException('Total amount cannot be negative');
    }

    if (!this.items || this.items.length === 0) {
      throw new InvalidInputException('Order must have at least one item');
    }

    this.items.forEach(item => {
      if (item.quantity < 1) {
        throw new InvalidInputException('Item quantity must be at least 1');
      }
      if (item.price < 0) {
        throw new InvalidInputException('Item price cannot be negative');
      }
    });
  }
}