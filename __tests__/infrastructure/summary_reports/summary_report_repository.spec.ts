import { SummaryReport } from '../../../src/domain/models/summary_report/summary_report';
import { SummaryReportRepository } from '../../../src/infrastructure/summary_reports/summary_report_repository';

describe('SummaryReportRepository', () => {
  SpreadsheetApp.openById = jest.fn(() => ({
    getSheetByName: jest.fn(() => ({
      getLastRow: jest.fn(() => 105),
      getLastColumn: jest.fn(() => 9),
      getRange: jest.fn(() => ({
        getValues: jest.fn(() => [
          [100, 'xxx', 35, 10, 10, 1, 20, 0.5, 5, new Date(2020, 8, 28, 19, 30, 0)],
          [101, 'yyy', 35, 10, 10, 1, 20, 0.5, 5, new Date(2020, 8, 28, 19, 30, 0)],
          [102, 'zzz', 35, 10, 10, 1, 20, 0.5, 5, new Date(2020, 8, 28, 19, 30, 0)],
          [103, 'xxx', 36, 10, 10, 1, 20, 0.5, 5, new Date(2020, 9, 5, 19, 30, 0)],
          [104, 'zzz', 36, 10, 10, 1, 20, 0.5, 5, new Date(2020, 9, 5, 19, 30, 0)],
        ]),
        setValues: jest.fn(),
      })),
    })),
  })) as any;

  PropertiesService.getScriptProperties = jest.fn(() => ({
    getProperty: jest.fn(() => 'SPREAD_SHEET_ID'),
  })) as any;

  CacheService.getScriptCache = jest.fn(() => ({
    get: jest.fn(() => null),
    put: jest.fn(),
  })) as any;

  const summaryReportRepository = new SummaryReportRepository();

  describe('#last', () => {
    it('returns a summaryReport resource', () => {
      const lastSummaryReport = summaryReportRepository.last();
      expect(lastSummaryReport).toStrictEqual(
        new SummaryReport(104, 'zzz', 36, 10, 10, 1, 20, 0.5, 5, new Date(2020, 9, 5, 19, 30, 0)),
      );
    });
  });

  describe('#bulkInsert', () => {
    describe('when normal', () => {
      it('returns created summaryReportIds', () => {
        const summaryReports = [
          new SummaryReport(105, 'xxx', 36, 10, 10, 1, 20, 0.5, 5, new Date()),
          new SummaryReport(106, 'yyy', 36, 10, 10, 1, 20, 0.5, 5, new Date()),
          new SummaryReport(107, 'zzz', 36, 10, 10, 1, 20, 0.5, 5, new Date()),
        ];
        const ids = summaryReportRepository.bulkInsert(summaryReports);
        expect(ids).toStrictEqual([105, 106, 107]);
      });
    });

    describe('when insert data does not exist', () => {
      it('returns created summaryReportIds', () => {
        const summaryReports = [];
        const ids = summaryReportRepository.bulkInsert(summaryReports);
        expect(ids).toStrictEqual([]);
      });
    });
  });
});
