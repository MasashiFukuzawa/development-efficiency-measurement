export class SummaryReportMeasurementCount {
  measurementCount: number;
  constructor(measurementCount: number) {
    if (measurementCount === null) {
      throw new Error('SummaryReportMeasurementCountが存在しません');
    }
    if (isNaN(measurementCount)) {
      throw new Error(
        'SummaryReportMeasurementCountはnumber型でなければなりません',
      );
    }
    this.measurementCount = measurementCount;
  }

  toNumber(): number {
    return this.measurementCount;
  }
}
