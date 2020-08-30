export class StandardValueMeasurementCount {
  measurementCount: number;
  constructor(measurementCount: number) {
    if (measurementCount === null) {
      throw new Error('StandardValueMeasurementCountが存在しません');
    }
    if (isNaN(measurementCount)) {
      throw new Error('StandardValueMeasurementCountはnumber型でなければなりません');
    }
    this.measurementCount = measurementCount;
  }

  toNumber(): number {
    return this.measurementCount;
  }
}
