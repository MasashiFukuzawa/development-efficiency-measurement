export class MeasurementStopAt {
  stopAt?: Date;
  constructor(stopAt?: Date) {
    const isUndefined = typeof stopAt === 'undefined';
    if (!isUndefined && typeof stopAt !== 'object') {
      throw new Error('MeasurementStopAtはDate型でなければなりません');
    }
    if (!isUndefined) this.stopAt = stopAt;
  }

  toDate(): Date | undefined {
    return this.stopAt;
  }
}
