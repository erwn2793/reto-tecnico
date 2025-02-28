import { BaseEntity } from '../../../database/base.entity';
import { UserRole } from '../../../shared/types/role.type';
import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm';

@Entity('users')
export class UserORMEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;
}