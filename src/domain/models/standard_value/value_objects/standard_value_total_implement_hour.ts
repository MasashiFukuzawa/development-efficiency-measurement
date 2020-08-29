export class StandardValueTotalImplementHour {
  totalImplementHour: number;
  constructor(totalImplementHour: number) {
    if (totalImplementHour === null) {
      throw new Error('StandardValueTotalImplementHourが存在しません');
    }
    if (isNaN(totalImplementHour)) {
      throw new Error(
        'StandardValueTotalImplementHourはnumber型でなければなりません',
      );
    }
    this.totalImplementHour = totalImplementHour;
  }

  toNumber(): number {
    return this.totalImplementHour;
  }
}
