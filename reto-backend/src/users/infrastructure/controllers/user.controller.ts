import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { UserRepository } from '../persistence/user.repository';
import { RegisterUserDto } from '../../application/dtos/register-user.dto';

@Controller('users')
export class UserController {
  private readonly registerUserUseCase: RegisterUserUseCase;

  constructor(private readonly userRepository: UserRepository) {
    this.registerUserUseCase = new RegisterUserUseCase(userRepository);
  }

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.registerUserUseCase.execute(dto);
  }
}