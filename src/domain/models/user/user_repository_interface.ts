import { User } from './user';

export interface UserRepositoryInterface {
  findByUserId(userId: string): User | null;
  create(userId: string, userName: string): User;
  getAll(): readonly User[];
}
