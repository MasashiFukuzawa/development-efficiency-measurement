import { UserRepositoryInterface } from '../../domain/models/user/user_repository_interface';
import { User } from '../../domain/models/user/user';
import { BaseRepository } from '../base_repository';

export class UserRepository extends BaseRepository
  implements UserRepositoryInterface {
  constructor(sheetName = 'users') {
    super(sheetName);
  }

  map(data: any[][]): readonly User[] {
    return data.map((e) => {
      return new User(e[0], e[1], e[2]);
    });
  }

  findByUserId(userId: string): User | null {
    const user = this.fullData.find((e) => e.getUserId().toString() === userId);
    return !!user ? user : null;
  }

  create(userId: string, userName: string): User {
    const user = new User(userId, userName);
    this.sheet
      .getRange(this.lastRow + 1, 1, 1, this.lastCol)
      .setValues([[userId, userName, user.getRegisteredAt().toDate()]]);
    return user;
  }
}
