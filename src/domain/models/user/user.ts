import { UserId } from './value_objects/user_id';
import { UserName } from './value_objects/user_name';

export class User {
  private readonly id: UserId;
  private readonly name: UserName;
  private readonly createdAt: Date;
  constructor(id: string, name: string, createdAt = new Date()) {
    this.id = new UserId(id);
    this.name = new UserName(name);
    this.createdAt = createdAt;
  }

  getId(): UserId {
    return this.id;
  }

  getName(): UserName {
    return this.name;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getRecordNotUniqueErrorMessage(): string {
    return `Unique制約に引っ掛かりました。${this.getName().toString()} さんは既に登録されています`;
  }

  static validate(id: string, name: string): string | null {
    try {
      new UserId(id);
      new UserName(name);
      return null;
    } catch (e) {
      return e;
    }
  }
}
