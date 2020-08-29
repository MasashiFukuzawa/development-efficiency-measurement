export class SummaryReportNotifiedAt {
  notifiedAt: Date;
  constructor(notifiedAt: Date) {
    if (!notifiedAt) throw new Error('SummaryReportNotifiedAtが存在しません');
    if (typeof notifiedAt !== 'object') {
      throw new Error('SummaryReportNotifiedAtはDate型でなければなりません');
    }
    this.notifiedAt = notifiedAt;
  }

  toDate(): Date {
    return this.notifiedAt;
  }
}
