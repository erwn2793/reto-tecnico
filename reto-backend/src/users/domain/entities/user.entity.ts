import { UserRole } from "src/shared/types/role.type";
import { InvalidEmailError, InvalidPasswordError } from "../errors/user.errors";

export class User {
  constructor(
    public readonly id: string,
    private readonly _email: string,
    private _password: string,
    private _role: UserRole,
  ) { 
    this.validateEmail(_email);
  }

  static create(id: string, email: string, password: string, role: UserRole): User {
    return new User(id, email, password, role);
  }

  get email(): string {
    return this._email;
  }

  get role(): UserRole {
    return this._role;
  }

  get password(): string {
    return this._password;
  }

  changePassword(newPassword: string): void {
    this.validatePassword(newPassword);
    this._password = newPassword;
  }

  changeRole(newRole: UserRole): void {
    this._role = newRole;
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new InvalidEmailError('Invalid email format');
    }
  }

  private validatePassword(password: string): void {
    if (password.length < 8) {
      throw new InvalidPasswordError('Password must be at least 8 characters long');
    }
  }
}