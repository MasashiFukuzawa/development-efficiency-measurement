export class MeasurementId {
  measurementId: number;
  constructor(id: number) {
    if (!id) throw new Error('MeasurementIdが存在しません');
    if (isNaN(id)) {
      throw new Error('MeasurementIdはnumber型でなければなりません');
    }
    this.measurementId = id;
  }

  toNumber(): number {
    return this.measurementId;
  }
}
