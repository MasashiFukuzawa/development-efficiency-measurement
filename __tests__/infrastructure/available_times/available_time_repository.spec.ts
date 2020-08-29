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
    describe('when unique', () => {
      it('creates successfully', () => {
        const availableTime = availableTimeRepository.create(
          'IM1234',
          35,
          10000000,
        );
        const userId = availableTime.getUserId().toString();
        const iosWeek = availableTime.getAvailableTimeIsoWeek().toNumber();
        const totalTimes = availableTime.getAvailableTimeTotalTime().toNumber();
        expect(userId).toBe('IM1234');
        expect(iosWeek).toBe(35);
        expect(totalTimes).toBe(10000000);
      });
    });

    describe('when not unique', () => {
      SpreadsheetApp.openById = jest.fn(() => ({
        getSheetByName: jest.fn(() => ({
          getLastRow: jest.fn(() => 4),
          getLastColumn: jest.fn(() => 8),
          getRange: jest.fn(() => ({
            getValues: jest.fn(() => [
              ['IM1234', 34, 71100000],
              ['IM1234', 35, 71100000],
            ]),
            setValues: jest.fn(),
          })),
        })),
      })) as any;

      it('does not create', () => {
        const availableTime = availableTimeRepository.create(
          'IM1234',
          35,
          10000000,
        );
        const userId = availableTime.getUserId().toString();
        const iosWeek = availableTime.getAvailableTimeIsoWeek().toNumber();
        const totalTimes = availableTime.getAvailableTimeTotalTime().toNumber();
        expect(userId).toBe('IM1234');
        expect(iosWeek).toBe(35);
        expect(totalTimes).toBe(10000000);
      });
    });
  });
});
