export class StandardValueAverageImplementHour {
  averageImplementHour: number;
  constructor(averageImplementHour: number) {
    if (averageImplementHour === null) {
      throw new Error('StandardValueAverageImplementHourが存在しません');
    }
    if (isNaN(averageImplementHour)) {
      throw new Error(
        'StandardValueAverageImplementHourはnumber型でなければなりません',
      );
    }
    this.averageImplementHour = averageImplementHour;
  }

  toNumber(): number {
    return this.averageImplementHour;
  }
}
