export class SummaryReportAverageImplementHour {
  averageImplementHour: number;
  constructor(averageImplementHour: number) {
    if (averageImplementHour === null) {
      throw new Error('SummaryReportAverageImplementHourが存在しません');
    }
    if (isNaN(averageImplementHour)) {
      throw new Error('SummaryReportAverageImplementHourはnumber型でなければなりません');
    }
    this.averageImplementHour = averageImplementHour;
  }

  toNumber(): number {
    return this.averageImplementHour;
  }
}
