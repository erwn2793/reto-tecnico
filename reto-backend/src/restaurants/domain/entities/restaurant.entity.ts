import { InvalidInputException } from "../../../shared/exceptions/domain/domain.exceptions";

export class Restaurant {
    constructor(
      public readonly ownerId: string,
      public readonly name: string,
      public readonly address: string,
      public readonly phone: string,
    ) {
      this.validateRestaurant();
    }
  
    private validateRestaurant(): void {
      if (!this.name || !this.address || !this.phone) {
        throw new InvalidInputException('Restaurant must have all required fields');
      }
      if (!this.ownerId) {
        throw new InvalidInputException('Owner ID is required');
      }
    }
  }