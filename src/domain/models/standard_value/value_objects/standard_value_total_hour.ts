export class SummaryReportTotalHour {
  totalHour: number;
  constructor(totalHour: number) {
    if (totalHour === null) {
      throw new Error('SummaryReportTotalHourが存在しません');
    }
    if (isNaN(totalHour)) {
      throw new Error('SummaryReportTotalHourはnumber型でなければなりません');
    }
    this.totalHour = totalHour;
  }

  toNumber(): number {
    return this.totalHour;
  }
}
