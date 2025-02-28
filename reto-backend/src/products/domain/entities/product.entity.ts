import { InvalidInputException } from '../../../shared/exceptions/domain/domain.exceptions';

export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly restaurantId: string,
  ) {
    this.validateProduct();
  }

  private validateProduct(): void {
    if (!this.name) {
      throw new InvalidInputException('Product name is required');
    }
    if (this.price <= 0) {
      throw new InvalidInputException('Price must be greater than 0');
    }
    if (!this.restaurantId) {
      throw new InvalidInputException('Restaurant ID is required');
    }
  }
}