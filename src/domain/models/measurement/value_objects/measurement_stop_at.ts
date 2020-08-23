export class MeasurementStopAt {
  stopAt?: Date;
  constructor(stopAt?: Date) {
    if (!this.isUndefined(stopAt) && typeof stopAt !== 'object') {
      throw new Error('MeasurementStopAtはDate型でなければなりません');
    }
    if (!this.isUndefined(stopAt)) this.stopAt = stopAt;
  }

  toDate(): Date | undefined {
    return this.stopAt;
  }

  isUndefined(stopAt?: Date): boolean {
    return typeof stopAt === 'undefined';
  }
}
