import { User } from './user';

export interface UserRepositoryInterface {
  getAll(): readonly User[];
  getRawData(): readonly any[][];
  map(data: any[][]): readonly User[];
  putCache(userId: string, userName: string, now: Date): void;
  findByUserId(userId: string): User | null;
  create(userId: string, userName: string): User;
}
