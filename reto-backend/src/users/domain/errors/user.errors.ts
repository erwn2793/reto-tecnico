export class InvalidEmailError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'InvalidEmailError';
    }
  }
  
  export class InvalidPasswordError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'InvalidPasswordError';
    }
  }