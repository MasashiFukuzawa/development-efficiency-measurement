export class UserName {
  name: string;
  constructor(name: string) {
    if (!name) throw new Error('UserNameが存在しません');
    if (typeof name !== 'string') {
      throw new Error('UserNameはstring型でなければなりません');
    }
    this.name = name;
  }

  toString(): string {
    return this.name;
  }
}
