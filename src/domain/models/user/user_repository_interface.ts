import { User } from './user';

export interface UserRepositoryInterface {
  getAll(): readonly User[];
  getRawData(): readonly any[][];
  map(data: any[][]): readonly User[];
  putCache(...attributes: any): void;
  findByUserId(userId: string): User | null;
  create(userId: string, userName: string): User;
}
