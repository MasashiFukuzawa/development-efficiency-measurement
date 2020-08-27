import { UserSetting } from '../../../../src/domain/models/user_setting/user_setting';
import { TheoreticalTimeRepository } from '../../../../src/infrastructure/theoretical_times/theoretical_time_repository';
import { UserSettingRepository } from '../../../../src/infrastructure/user_settings/user_setting_repository';
import { TheoreticalTimeCalculateInteractor } from '../../../../src/domain/applications/theoretical_time/theoretical_time_calculate_interactor';
import { TheoreticalTimeCalculateInputData } from '../../../../src/use_case/theoretical_time/calculate/theoretical_time_calculate_input_data';

describe('TheoreticalTimeCalculateInteractor', () => {
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

  Moment.moment = jest.fn(() => ({
    isoWeek: jest.fn(() => 35),
    day: jest.fn(() => ({
      toDate: jest.fn(() => new Date()),
    })),
  }));

  const userRepository = new TheoreticalTimeRepository();
  const userSettingRepository = new UserSettingRepository();
  const userCalculateInteractor = new TheoreticalTimeCalculateInteractor(
    userRepository,
    userSettingRepository,
  );

  describe('#handle', () => {
    it('sends a create message successfully', () => {
      const userSettings = [
        new UserSetting(
          'IM1234',
          'izuku.midoriya@example.com',
          10,
          0,
          19,
          0,
          'on',
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
          'on',
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
      jest.spyOn(TheoreticalTimeRepository.prototype, 'create');
      jest.spyOn(console, 'log');

      userCalculateInteractor.handle();
      expect(console.log).toHaveBeenCalledTimes(userSettings.length);
    });
  });
});
