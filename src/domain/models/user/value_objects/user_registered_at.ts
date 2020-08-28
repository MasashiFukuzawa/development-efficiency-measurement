export class UserRegisteredAt {
  registeredAt: Date;
  constructor(registeredAt: Date) {
    if (!registeredAt) throw new Error('UserRegisteredAtが存在しません');
    if (typeof registeredAt !== 'object') {
      throw new Error('UserRegisteredAtはDate型でなければなりません');
    }
    this.registeredAt = registeredAt;
  }

  toDate(): Date {
    return this.registeredAt;
  }
}
