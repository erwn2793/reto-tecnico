import { User } from '../../domain/entities/user.entity';
import { UserORMEntity } from '../persistence/user.orm-entity';

export class UserMapper {
  static toDomain(userOrm: UserORMEntity): User {
    return new User(userOrm.id, userOrm.email, userOrm.password, userOrm.role);
  }

  static toPersistence(user: User): UserORMEntity {
    const userOrm = new UserORMEntity();
    userOrm.email = user.email;
    userOrm.password = user.password;
    userOrm.role = user.role;
    return userOrm;
  }
}