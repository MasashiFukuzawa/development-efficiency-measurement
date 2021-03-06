import { UserSetting } from '../../../../src/domain/models/user_setting/user_setting';
import { UserSettingRepository } from '../../../../src/infrastructure/user_settings/user_setting_repository';
import { NotifyPresenter } from '../../../../src/app/presenters/notify/notify_presenter';
import { TheoreticalTimeNotifyInteractor } from '../../../../src/domain/applications/theoretical_time/theoretical_time_notify_interactor';

describe('TheoreticalTimeNotifyInteractor', () => {
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

  CalendarApp.getCalendarById = jest.fn(() => ({
    getEvents: jest.fn(() => ({
      map: jest.fn(() => [
        {
          willAttend: true,
          eventStartAt: new Date(2020, 8, 25, 18, 0, 0, 0),
          eventEndAt: new Date(2020, 8, 25, 19, 0, 0, 0),
        },
        {
          willAttend: true,
          eventStartAt: new Date(2020, 8, 25, 11, 30, 0, 0),
          eventEndAt: new Date(2020, 8, 25, 12, 30, 0, 0),
        },
        {
          willAttend: false,
          eventStartAt: new Date(2020, 8, 25, 15, 0, 0, 0),
          eventEndAt: new Date(2020, 8, 25, 16, 0, 0, 0),
        },
      ]),
    })),
  })) as any;

  UrlFetchApp.fetch = jest.fn();

  CacheService.getScriptCache = jest.fn(() => ({
    get: jest.fn(() => null),
    put: jest.fn(),
  })) as any;

  Moment.moment = jest.fn(() => ({
    startOf: jest.fn(() => ({
      toDate: jest.fn(() => new Date()),
    })),
    endOf: jest.fn(() => ({
      toDate: jest.fn(() => new Date()),
    })),
    isoWeekday: jest.fn(() => 3),
  }));

  const userSettingRepository = new UserSettingRepository();
  const notifyPresenter = new NotifyPresenter();
  const userNotifyInteractor = new TheoreticalTimeNotifyInteractor(
    userSettingRepository,
    notifyPresenter,
  );

  describe('#handle', () => {
    it("sends today's available time", () => {
      const userSettings = [
        new UserSetting('IM1234', 'izuku.midoriya@example.com', 10, 0, 19, 0, 'off', new Date()),
        new UserSetting('KB5678', 'katsuki.bakugo@example.com', 10, 0, 19, 0, 'on', new Date()),
        new UserSetting('OU1234', 'ochako.uraraka@example.com', 10, 0, 19, 0, 'off', new Date()),
        new UserSetting('ST5678', 'shoto.todoroki@example.com', 10, 0, 19, 0, 'on', new Date()),
      ];

      jest.spyOn(UserSettingRepository.prototype, 'getAll').mockReturnValue(userSettings);

      userNotifyInteractor.handle();
      expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(2);
    });
  });
});
