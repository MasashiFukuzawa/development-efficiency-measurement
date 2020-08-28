export class SummaryReportId {
  summaryReportId: number;
  constructor(id: number) {
    if (!id) throw new Error('SummaryReportIdが存在しません');
    if (isNaN(id)) {
      throw new Error('SummaryReportIdはnumber型でなければなりません');
    }
    this.summaryReportId = id;
  }

  toNumber(): number {
    return this.summaryReportId;
  }
}
