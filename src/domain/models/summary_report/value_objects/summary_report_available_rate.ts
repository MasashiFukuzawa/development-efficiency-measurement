export class SummaryReportAvailableRate {
  availableRate: number;
  constructor(availableRate: number) {
    if (availableRate === null) {
      throw new Error('SummaryReportAvailableRateが存在しません');
    }
    if (isNaN(availableRate)) {
      throw new Error('SummaryReportAvailableRateはnumber型でなければなりません');
    }
    this.availableRate = availableRate;
  }

  toNumber(): number {
    return this.availableRate;
  }
}
