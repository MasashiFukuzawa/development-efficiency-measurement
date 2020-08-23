export class UserId {
  id: string;
  constructor(id: string) {
    if (!id) throw new Error('UserIdが存在しません');
    if (typeof id !== 'string') {
      throw new Error('UserIdはstring型でなければなりません');
    }
    this.id = id;
  }

  toString(): string {
    return this.id;
  }
}
