import { StandardValue } from '../../../../src/domain/models/standard_value/standard_value';
import { SummaryReport } from '../../../../src/domain/models/summary_report/summary_report';

describe('StandardValue', () => {
  Moment.moment = jest.fn(() => ({
    diff: jest.fn(() => 3600000),
  }));

  describe('.calculateAverage', () => {
    it('returns hour', () => {
      const summaryReports = [
        new SummaryReport(105, 'xxx', 36, 5, 10, 0.5, 20, 0.5, 1.25, new Date()),
        new SummaryReport(106, 'yyy', 36, 10, 20, 0.5, 25, 0.8, 4, new Date()),
        new SummaryReport(107, 'zzz', 36, 15, 30, 0.5, 50, 0.6, 4.5, new Date()),
      ];
      const result = StandardValue.calculateAverage(summaryReports);
      expect(result).toStrictEqual(
        new StandardValue(
          36,
          (5 + 10 + 15) / 3,
          (10 + 20 + 30) / 3,
          (0.5 + 0.5 + 0.5) / 3,
          (20 + 25 + 50) / 3,
          (0.5 + 0.8 + 0.6) / 3,
          (1.25 + 4 + 4.5) / 3,
        ),
      );
    });
  });
});
