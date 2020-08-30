import { AvailableTimeRepository } from '../../../src/infrastructure/available_times/available_time_repository';

describe('AvailableTimeRepository', () => {
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

  const availableTimeRepository = new AvailableTimeRepository();

  describe('#create', () => {
    it('creates successfully', () => {
      const availableTime = availableTimeRepository.create('IM1234', 1, 10000000);
      const userId = availableTime.getUserId().toString();
      const iosWeekId = availableTime.getIsoWeekId().toNumber();
      const totalTimes = availableTime.getTheoreticalImplementTime().toNumber();
      expect(userId).toBe('IM1234');
      expect(iosWeekId).toBe(1);
      expect(totalTimes).toBe(10000000);
    });
  });
});
