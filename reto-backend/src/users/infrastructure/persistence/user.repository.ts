import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UserORMEntity } from './user.orm-entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectRepository(UserORMEntity) private readonly repo: Repository<UserORMEntity>) {}

  async findByEmail(email: string): Promise<User | null> {
    const userORM = await this.repo.findOne({ where: { email } });
    return userORM ? UserMapper.toDomain(userORM) : null;
  }

  async save(user: User): Promise<User> {
    const newUserORM = UserMapper.toPersistence(user);
    const savedUser = await this.repo.save(newUserORM);
    return UserMapper.toDomain(savedUser);
  }
}