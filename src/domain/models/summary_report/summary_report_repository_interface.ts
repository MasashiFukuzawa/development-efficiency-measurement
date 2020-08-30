import { SummaryReport } from './summary_report';

export interface SummaryReportRepositoryInterface {
  getAll(): readonly SummaryReport[];
  map(data: any[][]): readonly SummaryReport[];
  last(): SummaryReport | null;
  bulkInsert(summaryReports: SummaryReport[]): number[];
}
