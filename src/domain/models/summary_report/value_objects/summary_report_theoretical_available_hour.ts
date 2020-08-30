export class SummaryReportTheoreticalAvailableHour {
  theoreticalAvailableHour: number;
  constructor(theoreticalAvailableHour: number) {
    if (theoreticalAvailableHour === null) {
      throw new Error('SummaryReportTheoreticalAvailableHourが存在しません');
    }
    if (isNaN(theoreticalAvailableHour)) {
      throw new Error('SummaryReportTheoreticalAvailableHourはnumber型でなければなりません');
    }
    this.theoreticalAvailableHour = theoreticalAvailableHour;
  }

  toNumber(): number {
    return this.theoreticalAvailableHour;
  }
}
