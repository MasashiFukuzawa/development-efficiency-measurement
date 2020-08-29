export class SummaryReportTotalImplementHour {
  totalImplementHour: number;
  constructor(totalImplementHour: number) {
    if (totalImplementHour === null) {
      throw new Error('SummaryReportTotalImplementHourが存在しません');
    }
    if (isNaN(totalImplementHour)) {
      throw new Error(
        'SummaryReportTotalImplementHourはnumber型でなければなりません',
      );
    }
    this.totalImplementHour = totalImplementHour;
  }

  toNumber(): number {
    return this.totalImplementHour;
  }
}
