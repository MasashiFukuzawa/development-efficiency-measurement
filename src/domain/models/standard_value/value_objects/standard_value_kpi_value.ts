export class SummaryReportKpiValue {
  kpiValue: number;
  constructor(kpiValue: number) {
    if (kpiValue === null) {
      throw new Error('SummaryReportKpiValueが存在しません');
    }
    if (isNaN(kpiValue)) {
      throw new Error('SummaryReportKpiValueはnumber型でなければなりません');
    }
    this.kpiValue = kpiValue;
  }

  toNumber(): number {
    return this.kpiValue;
  }
}
