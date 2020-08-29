export class SummaryReportAverageHour {
  averageHour: number;
  constructor(averageHour: number) {
    if (averageHour === null) {
      throw new Error('SummaryReportAverageHourが存在しません');
    }
    if (isNaN(averageHour)) {
      throw new Error('SummaryReportAverageHourはnumber型でなければなりません');
    }
    this.averageHour = averageHour;
  }

  toNumber(): number {
    return this.averageHour;
  }
}
