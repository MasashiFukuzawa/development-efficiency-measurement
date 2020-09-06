import { UserSettingRepository } from '../../../../src/infrastructure/user_settings/user_setting_repository';
import { TheoreticalTimeRepository } from '../../../../src/infrastructure/theoretical_times/theoretical_time_repository';
import { MeasurementRepository } from '../../../../src/infrastructure/measurements/measurement_repository';
import { UserSetting } from '../../../../src/domain/models/user_setting/user_setting';
import { SummaryReport } from '../../../../src/domain/models/summary_report/summary_report';
import { SummaryReportRepository } from '../../../../src/infrastructure/summary_reports/summary_report_repository';
import { StandardValueRepository } from '../../../../src/infrastructure/standard_values/standard_value_repository';
import { NotifyPresenter } from '../../../../src/app/presenters/notify/notify_presenter';
import { IsoWeekRepository } from '../../../../src/infrastructure/iso_weeks/iso_week_repository';
import { SummaryReportNotifyInteractor } from '../../../../src/domain/applications/summary_report/summary_report_notify_interactor';
import { IsoWeek } from '../../../../src/domain/models/iso_week/iso_week';
import { TheoreticalTime } from '../../../../src/domain/models/theoretical_time/theoretical_time';
import { Measurement } from '../../../../src/domain/models/measurement/measurement';

describe('SummaryReportNotifyInteractor', () => {
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

  UrlFetchApp.fetch = jest.fn() as any;

  CacheService.getScriptCache = jest.fn(() => ({
    get: jest.fn(() => null),
    put: jest.fn(),
  })) as any;

  Moment.moment = jest.fn(() => ({
    get: jest.fn(() => 2020),
    isoWeek: jest.fn(() => 35),
    diff: jest.fn(() => 100000),
  }));

  const isoWeekRepository = new IsoWeekRepository();
  const userSettingRepository = new UserSettingRepository();
  const theoreticalTimeRepository = new TheoreticalTimeRepository();
  const measurementRepository = new MeasurementRepository();
  const summaryReportRepository = new SummaryReportRepository();
  const standardValueRepository = new StandardValueRepository();
  const notifyPresenter = new NotifyPresenter();
  const summaryReportNotifyInteractor = new SummaryReportNotifyInteractor(
    isoWeekRepository,
    userSettingRepository,
    theoreticalTimeRepository,
    measurementRepository,
    summaryReportRepository,
    standardValueRepository,
    notifyPresenter,
  );

  const isoWeekId = 1;
  const isoWeek = new IsoWeek(isoWeekId, 2020, 35);

  const userId1 = 'IM1234';
  const userId2 = 'KB4567';
  const userId3 = 'OU1234';

  const userSettings = [
    new UserSetting(userId1, 'izuku.midoriya@example.com', 10, 0, 19, 0, 'on', new Date()),
    new UserSetting(userId2, 'katsuki.bakugo@example.com', 10, 0, 19, 0, 'off', new Date()),
    new UserSetting(userId3, 'ochako.uraraka@example.com', 10, 0, 19, 0, 'on', new Date()),
  ];
  const theoreticalTimes = [
    new TheoreticalTime(userId1, isoWeekId, 10000000),
    new TheoreticalTime(userId2, isoWeekId, 10000000),
    new TheoreticalTime(userId3, isoWeekId, 10000000),
  ];
  const measurements = [
    new Measurement(
      1,
      userId1,
      isoWeekId,
      new Date(2020, 8, 25, 11, 11, 11),
      new Date(2020, 8, 25, 12, 22, 22),
    ),
    new Measurement(
      2,
      userId1,
      isoWeekId,
      new Date(2020, 8, 26, 12, 22, 22),
      new Date(2020, 8, 26, 13, 33, 33),
    ),
    new Measurement(
      3,
      userId1,
      isoWeekId,
      new Date(2020, 8, 27, 13, 33, 33),
      new Date(2020, 8, 27, 14, 44, 44),
    ),
    new Measurement(
      4,
      userId2,
      isoWeekId,
      new Date(2020, 8, 25, 10, 11, 11),
      new Date(2020, 8, 25, 12, 22, 50),
    ),
    new Measurement(
      5,
      userId2,
      isoWeekId,
      new Date(2020, 8, 26, 12, 22, 22),
      new Date(2020, 8, 26, 14, 33, 50),
    ),
    new Measurement(
      6,
      userId2,
      isoWeekId,
      new Date(2020, 8, 27, 16, 33, 33),
      new Date(2020, 8, 27, 18, 44, 50),
    ),
    new Measurement(
      7,
      userId3,
      isoWeekId,
      new Date(2020, 8, 25, 8, 11, 11),
      new Date(2020, 8, 25, 9, 22, 50),
    ),
    new Measurement(
      8,
      userId3,
      isoWeekId,
      new Date(2020, 8, 26, 12, 0, 0),
      new Date(2020, 8, 26, 14, 0, 0),
    ),
    new Measurement(
      9,
      userId3,
      isoWeekId,
      new Date(2020, 8, 27, 19, 33, 33),
      new Date(2020, 8, 27, 20, 44, 50),
    ),
  ];
  const summaryReport = new SummaryReport(100, userId1, isoWeekId, 10, 10, 1, 20, 0.5, 5);

  describe('#handle', () => {
    describe('when user exists', () => {
      it('sends reports successfully', () => {
        jest.spyOn(IsoWeekRepository.prototype, 'find').mockReturnValue(isoWeek);
        jest.spyOn(UserSettingRepository.prototype, 'getAll').mockReturnValue(userSettings);
        jest.spyOn(TheoreticalTimeRepository.prototype, 'getAll').mockReturnValue(theoreticalTimes);
        jest.spyOn(MeasurementRepository.prototype, 'getAll').mockReturnValue(measurements);
        jest.spyOn(SummaryReportRepository.prototype, 'last').mockReturnValue(summaryReport);

        summaryReportNotifyInteractor.handle();
        expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(2);
      });
    });

    describe('when target user does not exist', () => {
      it('does not send message', () => {
        jest.spyOn(IsoWeekRepository.prototype, 'find').mockReturnValue(isoWeek);
        jest.spyOn(UserSettingRepository.prototype, 'getAll').mockReturnValue([]);

        summaryReportNotifyInteractor.handle();
        expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(0);
      });
    });

    describe('when target available time does not exist', () => {
      it('does not send message', () => {
        jest.spyOn(IsoWeekRepository.prototype, 'find').mockReturnValue(isoWeek);
        jest.spyOn(UserSettingRepository.prototype, 'getAll').mockReturnValue(userSettings);
        jest.spyOn(TheoreticalTimeRepository.prototype, 'getAll').mockReturnValue([]);

        summaryReportNotifyInteractor.handle();
        expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(0);
      });
    });

    describe('when target measurement does not exist', () => {
      it('does not send message', () => {
        jest.spyOn(IsoWeekRepository.prototype, 'find').mockReturnValue(isoWeek);
        jest.spyOn(UserSettingRepository.prototype, 'getAll').mockReturnValue(userSettings);
        jest.spyOn(TheoreticalTimeRepository.prototype, 'getAll').mockReturnValue(theoreticalTimes);
        jest.spyOn(MeasurementRepository.prototype, 'getAll').mockReturnValue([]);

        summaryReportNotifyInteractor.handle();
        expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(0);
      });
    });

    describe('when first report notification', () => {
      it('sends reports successfully', () => {
        jest.spyOn(IsoWeekRepository.prototype, 'find').mockReturnValue(isoWeek);
        jest.spyOn(UserSettingRepository.prototype, 'getAll').mockReturnValue(userSettings);
        jest.spyOn(TheoreticalTimeRepository.prototype, 'getAll').mockReturnValue(theoreticalTimes);
        jest.spyOn(MeasurementRepository.prototype, 'getAll').mockReturnValue(measurements);
        jest.spyOn(SummaryReportRepository.prototype, 'last').mockReturnValue(null);

        summaryReportNotifyInteractor.handle();
        expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(2);
      });
    });
  });
});
