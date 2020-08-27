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
    describe('when unique', () => {
      it('creates successfully', () => {
        const theoreticalTime = theoreticalTimeRepository.create(
          'IM1234',
          35,
          10000000,
        );
        const userId = theoreticalTime.getUserId().toString();
        const iosWeek = theoreticalTime.getTheoreticalTimeIsoWeek().toNumber();
        const totalTimes = theoreticalTime
          .getTheoreticalTimeTotalTime()
          .toNumber();
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
        const theoreticalTime = theoreticalTimeRepository.create(
          'IM1234',
          35,
          10000000,
        );
        const userId = theoreticalTime.getUserId().toString();
        const iosWeek = theoreticalTime.getTheoreticalTimeIsoWeek().toNumber();
        const totalTimes = theoreticalTime
          .getTheoreticalTimeTotalTime()
          .toNumber();
        expect(userId).toBe('IM1234');
        expect(iosWeek).toBe(35);
        expect(totalTimes).toBe(10000000);
      });
    });
  });
});
