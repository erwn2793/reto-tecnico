import { BaseEntity } from '../../../database/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, Generated, ManyToOne, JoinColumn } from 'typeorm';
import { UserORMEntity } from '../../../users/infrastructure/persistence/user.orm-entity';

@Entity('restaurants')
export class RestaurantORMEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ name: 'userId' })
  ownerId: string;

  @ManyToOne(() => UserORMEntity)
  @JoinColumn({ name: 'userId' })
  owner: UserORMEntity;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;
}