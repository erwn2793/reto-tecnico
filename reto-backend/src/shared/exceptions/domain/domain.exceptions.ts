import { BaseException } from '../base.exception';

export class EntityNotFoundException extends BaseException {
  constructor(entity: string, id: string) {
    super(
      `${entity} with id ${id} not found`,
      404,
      'ENTITY_NOT_FOUND'
    );
  }
}

export class InvalidInputException extends BaseException {
  constructor(message: string) {
    super(
      message,
      400,
      'INVALID_INPUT'
    );
  }
}

export class DuplicateEntityException extends BaseException {
  constructor(entity: string, field: string) {
    super(
      `${entity} with this ${field} already exists`,
      409,
      'DUPLICATE_ENTITY'
    );
  }
}

export class InternalServerException extends BaseException {
    constructor(message: string = 'An unexpected error occurred') {
      super(
        message,
        500,
        'INTERNAL_SERVER_ERROR'
      );
    }
  }
  
  export class DatabaseException extends BaseException {
    constructor(operation: string) {
      super(
        `Database error occurred during ${operation}`,
        500,
        'DATABASE_ERROR'
      );
    }
  }