import { UserSetting } from '../../../../src/domain/models/user_setting/user_setting';
import { UserSettingRepository } from '../../../../src/infrastructure/user_settings/user_setting_repository';
import { NotifyPresenter } from '../../../../src/webhook_app/common/presenters/notify/notify_presenter';
import { AvailableTimeNotifyInteractor } from '../../../../src/domain/applications/available_time/available_time_notify_interactor';

describe('AvailableTimeNotifyInteractor', () => {
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

  Moment.moment = jest.fn(() => ({
    startOf: jest.fn(() => ({
      toDate: jest.fn(() => new Date()),
    })),
    endOf: jest.fn(() => ({
      toDate: jest.fn(() => new Date()),
    })),
  }));

  const userSettingRepository = new UserSettingRepository();
  const notifyPresenter = new NotifyPresenter();
  const userNotifyInteractor = new AvailableTimeNotifyInteractor(
    userSettingRepository,
    notifyPresenter,
  );

  describe('#handle', () => {
    it("sends today's available time", () => {
      const userSettings = [
        new UserSetting(
          'IM1234',
          'izuku.midoriya@example.com',
          10,
          0,
          19,
          0,
          'off',
          new Date(),
        ),
        new UserSetting(
          'KB5678',
          'katsuki.bakugo@example.com',
          10,
          0,
          19,
          0,
          'on',
          new Date(),
        ),
        new UserSetting(
          'OU1234',
          'ochako.uraraka@example.com',
          10,
          0,
          19,
          0,
          'off',
          new Date(),
        ),
        new UserSetting(
          'ST5678',
          'shoto.todoroki@example.com',
          10,
          0,
          19,
          0,
          'on',
          new Date(),
        ),
      ];

      jest
        .spyOn(UserSettingRepository.prototype, 'getAll')
        .mockReturnValue(userSettings);

      userNotifyInteractor.handle();
      expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(2);
    });
  });
});
