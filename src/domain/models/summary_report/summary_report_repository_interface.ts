import { SummaryReport } from './summary_report';

export interface SummaryReportRepositoryInterface {
  last(): SummaryReport | null;
  bulkInsert(summaryReports: SummaryReport[]): number[];
}
