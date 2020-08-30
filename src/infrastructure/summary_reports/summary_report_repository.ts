import { SummaryReport } from '../../domain/models/summary_report/summary_report';
import { SummaryReportRepositoryInterface } from '../../domain/models/summary_report/summary_report_repository_interface';
import { BaseRepository } from '../base_repository';

export class SummaryReportRepository extends BaseRepository
  implements SummaryReportRepositoryInterface {
  constructor(sheetName = 'summary_reports') {
    super(sheetName);
  }

  map(fullData: any[][]): readonly SummaryReport[] {
    return fullData.map((e) => {
      return new SummaryReport(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9]);
    });
  }

  last(): SummaryReport | null {
    const lastSummaryReport = this.fullData[this.fullData.length - 1];
    return !!lastSummaryReport ? lastSummaryReport : null;
  }

  bulkInsert(summaryReports: SummaryReport[]): number[] {
    const count = summaryReports.length;
    const params = summaryReports.map((e) => {
      return [
        e.getSummaryReportId().toNumber(),
        e.getUserId().toString(),
        e.getIsoWeekId().toNumber(),
        e.getTotalImplementHour().toNumber(),
        e.getMeasurementCount().toNumber(),
        e.getAverageImplementHour().toNumber(),
        e.getTheoreticalAvailableHour().toNumber(),
        e.getAvailableRate().toNumber(),
        e.getKpiValue().toNumber(),
        e.getNotifiedAt().toDate(),
      ];
    });
    this.sheet.getRange(this.lastRow + 1, 1, count, this.lastCol).setValues(params);
    return summaryReports.map((e) => e.getSummaryReportId().toNumber());
  }
}
