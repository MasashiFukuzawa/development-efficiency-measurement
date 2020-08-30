export class SummaryReportTheoreticalHour {
  theoreticalHour: number;
  constructor(theoreticalHour: number) {
    if (theoreticalHour === null) {
      throw new Error('SummaryReportTheoreticalHourが存在しません');
    }
    if (isNaN(theoreticalHour)) {
      throw new Error(
        'SummaryReportTheoreticalHourはnumber型でなければなりません',
      );
    }
    this.theoreticalHour = theoreticalHour;
  }

  toNumber(): number {
    return this.theoreticalHour;
  }
}
