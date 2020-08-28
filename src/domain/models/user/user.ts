import { UserId } from './value_objects/user_id';
import { UserName } from './value_objects/user_name';
import { UserRegisteredAt } from './value_objects/user_registered_at';

export class User {
  private readonly id: UserId;
  private readonly name: UserName;
  private readonly registeredAt: UserRegisteredAt;
  constructor(id: string, name: string, registeredAt = new Date()) {
    this.id = new UserId(id);
    this.name = new UserName(name);
    this.registeredAt = new UserRegisteredAt(registeredAt);
  }

  getId(): UserId {
    return this.id;
  }

  getName(): UserName {
    return this.name;
  }

  getRegisteredAt(): UserRegisteredAt {
    return this.registeredAt;
  }

  static validate(id: string, name: string): string | null {
    try {
      new UserId(id);
      new UserName(name);
      return null;
    } catch (e) {
      return e.message;
    }
  }
}
