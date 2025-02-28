import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { UserRole } from 'src/shared/types/role.type';
import { DatabaseException, DuplicateEntityException } from 'src/shared/exceptions/domain/domain.exceptions';
import { BaseException } from 'src/shared/exceptions/base.exception';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: RegisterUserDto) {
    try {
      const existingUser = await this.userRepository.findByEmail(dto.email);
      if (existingUser) {
        throw new DuplicateEntityException('User', 'email');
      }
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const user = new User('', dto.email, hashedPassword, dto.role ?? UserRole.CUSTOMER);
      return this.userRepository.save(user);
    } catch (error) {
      if (error instanceof BaseException) {
        throw error;
      }
      throw new DatabaseException('user registration');
    }
  }
}