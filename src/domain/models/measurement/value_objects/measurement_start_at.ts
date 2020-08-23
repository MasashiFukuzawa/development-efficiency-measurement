export class MeasurementStartAt {
  startAt: Date;
  constructor(startAt: Date) {
    if (!startAt) throw new Error('MeasurementStartAtが存在しません');
    if (typeof startAt !== 'object') {
      throw new Error('MeasurementStartAtはDate型でなければなりません');
    }
    this.startAt = startAt;
  }

  toDate(): Date {
    return this.startAt;
  }
}
