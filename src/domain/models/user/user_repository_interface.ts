import { User } from './user';

export interface UserRepositoryInterface {
  getAll(): readonly User[];
  map(data: any[][]): readonly User[];
  findByUserId(userId: string): User | null;
  create(userId: string, userName: string): User;
}
