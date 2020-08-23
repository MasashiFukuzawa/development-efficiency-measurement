export class MeasurementStopAt {
  stopAt: Date | undefined;
  constructor(stopAt: Date | undefined) {
    if (stopAt !== undefined && typeof stopAt !== 'object') {
      throw new Error('MeasurementStopAtはDate型でなければなりません');
    }
    this.stopAt = stopAt;
  }

  toDate(): Date | undefined {
    return this.stopAt;
  }
}
