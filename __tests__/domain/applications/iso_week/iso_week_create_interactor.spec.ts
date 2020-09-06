import { IsoWeekRepository } from '../../../../src/infrastructure/iso_weeks/iso_week_repository';
import { IsoWeekCreateInteractor } from '../../../../src/domain/applications/iso_week/iso_week_create_interactor';
import { IsoWeek } from '../../../../src/domain/models/iso_week/iso_week';

describe('IsoWeekCreateInteractor', () => {
  SpreadsheetApp.openById = jest.fn(() => ({
    getSheetByName: jest.fn(() => ({
      getLastRow: jest.fn(() => 1),
      getLastColumn: jest.fn(() => 1),
      getRange: jest.fn(() => ({
        getValues: jest.fn(() => [[]]),
        setValues: jest.fn(),
      })),
    })),
  })) as any;

  PropertiesService.getScriptProperties = jest.fn(() => ({
    getProperty: jest.fn(() => 'xxxxxxx'),
  })) as any;

  CacheService.getScriptCache = jest.fn(() => ({
    get: jest.fn(() => null),
    put: jest.fn(),
  })) as any;

  Moment.moment = jest.fn(() => ({
    get: jest.fn(() => 2020),
    isoWeek: jest.fn(() => 35),
  }));

  const isoWeekRepository = new IsoWeekRepository();
  const measurementStartInteractor = new IsoWeekCreateInteractor(isoWeekRepository);

  describe('#handle', () => {
    describe('when target isoWeek does not exist', () => {
      it('creates new isoWeek', () => {
        jest.spyOn(IsoWeekRepository.prototype, 'find').mockReturnValue(null);
        const spy = jest.spyOn(console, 'log');
        measurementStartInteractor.handle(2020, 35);
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when target isoWeek exists', () => {
      it('does not create new isoWeek', () => {
        const isoWeek = new IsoWeek(1, 2020, 10);
        jest.spyOn(IsoWeekRepository.prototype, 'find').mockReturnValue(isoWeek);
        const spy = jest.spyOn(console, 'log');
        measurementStartInteractor.handle(2020, 35);
        expect(spy).toHaveBeenCalledTimes(0);
      });
    });
  });
});
