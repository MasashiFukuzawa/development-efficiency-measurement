import { IsoWeekRepository } from '../../../src/infrastructure/iso_weeks/iso_week_repository';

describe('IsoWeekRepository', () => {
  SpreadsheetApp.openById = jest.fn(() => ({
    getSheetByName: jest.fn(() => ({
      getLastRow: jest.fn(() => 5),
      getLastColumn: jest.fn(() => 3),
      getRange: jest.fn(() => ({
        getValues: jest.fn(() => [
          [1, 2020, 33],
          [2, 2020, 34],
          [3, 2020, 35],
          [4, 2020, 36],
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

  const isoWeekRepository = new IsoWeekRepository();

  describe('#find', () => {
    describe('when iso week exists', () => {
      it('returns a user resource', () => {
        const isoWeek = isoWeekRepository.find(2020, 35);
        expect(isoWeek.getIsoWeekId().toNumber()).toBe(3);
        expect(isoWeek.getIsoWeekYear().toNumber()).toBe(2020);
        expect(isoWeek.getIsoWeekIsoWeek().toNumber()).toBe(35);
      });
    });

    describe('when iso week does not exist', () => {
      it('returns null', () => {
        const isoWeek = isoWeekRepository.find(2020, 1);
        expect(isoWeek).toBe(null);
      });
    });
  });

  describe('#create', () => {
    it('returns a user resource', () => {
      const isoWeek = isoWeekRepository.create(2020, 37);
      expect(isoWeek.getIsoWeekId().toNumber()).toBe(5);
      expect(isoWeek.getIsoWeekYear().toNumber()).toBe(2020);
      expect(isoWeek.getIsoWeekIsoWeek().toNumber()).toBe(37);
    });
  });
});
