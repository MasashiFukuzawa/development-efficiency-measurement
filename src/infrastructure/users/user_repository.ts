import { UserRepositoryInterface } from '../../domain/models/user/user_repository_interface';
import { User } from '../../domain/models/user/user';
import { BaseRepository } from '../base_repository';
import { GoogleAppsScriptConstants } from '../../constants';

export class UserRepository extends BaseRepository implements UserRepositoryInterface {
  constructor(sheetName = 'users') {
    super(sheetName);
  }

  map(data: any[][]): readonly User[] {
    return data.map((e) => {
      return new User(e[0], e[1], typeof e[2] === 'string' ? Moment.moment(e[2]).toDate() : e[2]);
    });
  }

  findByUserId(userId: string): User | null {
    const user = this.fullData.find((e) => e.isTargetUser(userId));
    return !!user ? user : null;
  }

  create(userId: string, userName: string): User {
    const user = new User(userId, userName);
    const now = new Date();
    this.sheet.getRange(this.lastRow + 1, 1, 1, this.lastCol).setValues([[userId, userName, now]]);
    this.putCache(userId, userName, now);
    return user;
  }

  putCache(userId: string, userName: string, now: Date): void {
    const usersCache: readonly any[][] = !this.dbCache
      ? this.getRawData()
      : JSON.parse(this.dbCache);

    const usersCacheClone = [...usersCache];
    usersCacheClone.push([userId, userName, now]);

    this.cache.put(
      'data:users',
      JSON.stringify(usersCacheClone),
      GoogleAppsScriptConstants.MAX_CACHE_EXPIRATION_IN_SECONDS,
    );
  }
}
