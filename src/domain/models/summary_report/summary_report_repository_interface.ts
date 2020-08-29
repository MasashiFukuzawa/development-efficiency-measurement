import { SummaryReport } from './summary_report';

export interface SummaryReportRepositoryInterface {
  last(): SummaryReport;
  bulkInsert(summaryReports: SummaryReport[]): number[];
}
