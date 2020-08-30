export class SummaryReportTheoreticalRate {
  theoreticalRate: number;
  constructor(theoreticalRate: number) {
    if (theoreticalRate === null) {
      throw new Error('SummaryReportTheoreticalRateが存在しません');
    }
    if (isNaN(theoreticalRate)) {
      throw new Error('SummaryReportTheoreticalRateはnumber型でなければなりません');
    }
    this.theoreticalRate = theoreticalRate;
  }

  toNumber(): number {
    return this.theoreticalRate;
  }
}
