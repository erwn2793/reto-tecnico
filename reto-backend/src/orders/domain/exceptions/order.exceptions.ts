import { OrderStatus } from "../../../shared/types/status.type";

export class InvalidOrderStatusTransitionError extends Error {
    constructor(currentStatus: OrderStatus, newStatus: OrderStatus) {
      super(`Cannot transition order from ${currentStatus} to ${newStatus}`);
      this.name = 'InvalidOrderStatusTransitionError';
    }
  }
  
  export class InvalidOrderError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'InvalidOrderError';
    }
  }