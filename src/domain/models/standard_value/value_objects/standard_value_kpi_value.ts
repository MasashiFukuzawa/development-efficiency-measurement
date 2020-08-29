export class StandardValueKpiValue {
  kpiValue: number;
  constructor(kpiValue: number) {
    if (kpiValue === null) {
      throw new Error('StandardValueKpiValueが存在しません');
    }
    if (isNaN(kpiValue)) {
      throw new Error('StandardValueKpiValueはnumber型でなければなりません');
    }
    this.kpiValue = kpiValue;
  }

  toNumber(): number {
    return this.kpiValue;
  }
}
