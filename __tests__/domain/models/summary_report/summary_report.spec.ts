import { SummaryReport } from '../../../../src/domain/models/summary_report/summary_report';

describe('SummaryReport', () => {
  Moment.moment = jest.fn(() => ({
    diff: jest.fn(() => 3600000),
  }));

  describe('.convertMilliSecToHour', () => {
    it('returns hour', () => {
      const result = SummaryReport.convertMilliSecToHour(10800000);
      expect(result).toBe(3);
    });
  });

  describe('.count', () => {
    it('returns item count', () => {
      const measurements = [
        {
          start: new Date(2020, 8, 30, 10, 0, 0),
          stop: new Date(2020, 8, 30, 11, 0, 0),
        },
        {
          start: new Date(2020, 8, 30, 12, 0, 0),
          stop: new Date(2020, 8, 30, 13, 0, 0),
        },
        {
          start: new Date(2020, 8, 30, 14, 0, 0),
          stop: new Date(2020, 8, 30, 15, 0, 0),
        },
      ];
      const result = SummaryReport.count(measurements);
      expect(result).toBe(3);
    });
  });

  describe('.sum', () => {
    it('returns sum result in unit of hours', () => {
      const measurements = [
        {
          start: new Date(2020, 8, 30, 10, 0, 0),
          stop: new Date(2020, 8, 30, 11, 0, 0),
        },
        {
          start: new Date(2020, 8, 30, 12, 0, 0),
          stop: new Date(2020, 8, 30, 13, 0, 0),
        },
        {
          start: new Date(2020, 8, 30, 14, 0, 0),
          stop: new Date(2020, 8, 30, 15, 0, 0),
        },
      ];
      const result = SummaryReport.sum(measurements);
      expect(result).toBe(3 * 60 * 60 * 1000);
    });
  });

  describe('.average', () => {
    it('returns true', () => {
      const result = SummaryReport.average(3, 3);
      expect(result).toBe(1);
    });
  });

  describe('.calculateTheoreticalAvailableHour', () => {
    it('returns true', () => {
      const result = SummaryReport.calculateTheoreticalAvailableHour(71100000);
      expect(result).toBe(19.75);
    });
  });

  describe('.calculateAvailableRate', () => {
    it('returns true', () => {
      const result = SummaryReport.calculateAvailableRate(19.75, 3);
      expect(Math.round(result * 1000) / 1000).toBe(0.152);
    });
  });

  describe('.calculateKpiValue', () => {
    it('returns true', () => {
      const result = SummaryReport.calculateKpiValue(3, 1, 0.152);
      expect(Math.round(result * 10000) / 10000).toBe(0.456);
    });
  });
});
