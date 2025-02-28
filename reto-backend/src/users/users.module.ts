import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controllers/user.controller';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserORMEntity } from './infrastructure/persistence/user.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserORMEntity])],
  controllers: [UserController],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UsersModule { }
