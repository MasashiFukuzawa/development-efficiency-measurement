export class StandardValueAverageHour {
  averageHour: number;
  constructor(averageHour: number) {
    if (averageHour === null) {
      throw new Error('StandardValueAverageHourが存在しません');
    }
    if (isNaN(averageHour)) {
      throw new Error('StandardValueAverageHourはnumber型でなければなりません');
    }
    this.averageHour = averageHour;
  }

  toNumber(): number {
    return this.averageHour;
  }
}
