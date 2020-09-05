import { TheoreticalTimeRepository } from '../../../src/infrastructure/theoretical_times/theoretical_time_repository';

describe('TheoreticalTimeRepository', () => {
  SpreadsheetApp.openById = jest.fn(() => ({
    getSheetByName: jest.fn(() => ({
      getLastRow: jest.fn(() => 4),
      getLastColumn: jest.fn(() => 8),
      getRange: jest.fn(() => ({
        getValues: jest.fn(() => [[]]),
        setValues: jest.fn(),
      })),
    })),
  })) as any;

  PropertiesService.getScriptProperties = jest.fn(() => ({
    getProperty: jest.fn(() => 'SPREAD_SHEET_ID'),
  })) as any;

  const theoreticalTimeRepository = new TheoreticalTimeRepository();

  describe('#create', () => {
    it('creates successfully', () => {
      const theoreticalTime = theoreticalTimeRepository.create('IM1234', 1, 10000000);
      const userId = theoreticalTime.getUserId().toString();
      const iosWeekId = theoreticalTime.getIsoWeekId().toNumber();
      const totalTimes = theoreticalTime.getTheoreticalImplementTime().toNumber();
      expect(userId).toBe('IM1234');
      expect(iosWeekId).toBe(1);
      expect(totalTimes).toBe(10000000);
    });
  });
});
