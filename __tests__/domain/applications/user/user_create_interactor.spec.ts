import { User } from '../../../../src/domain/models/user/user';
import { UserSetting } from '../../../../src/domain/models/user_setting/user_setting';
import { UserRepository } from '../../../../src/infrastructure/users/user_repository';
import { UserSettingRepository } from '../../../../src/infrastructure/user_settings/user_setting_repository';
import { ReplyPresenter } from '../../../../src/webhook_app/common/presenters/reply/reply_presenter';
import { UserCreateInteractor } from '../../../../src/domain/applications/user/user_create_interactor';

describe('UserCreateInteractor', () => {
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

  ContentService.createTextOutput = jest.fn(() => ({
    setMimeType: jest.fn(),
  })) as any;

  ContentService.MimeType = jest.fn() as any;

  Moment.moment = jest.fn(() => ({
    format: jest.fn(() => '2020/8/23 11:22:00'),
  }));

  const userRepository = new UserRepository();
  const userSettingRepository = new UserSettingRepository();
  const replyPresenter = new ReplyPresenter();
  const userCreateInteractor = new UserCreateInteractor(
    userRepository,
    userSettingRepository,
    replyPresenter,
  );

  describe('#handle', () => {
    describe('when valid', () => {
      it('sends a create message successfully', () => {
        jest.spyOn(UserRepository.prototype, 'findByUserId').mockReturnValue(null);
        jest.spyOn(UserSettingRepository.prototype, 'findByUserId').mockReturnValue(null);

        const userId = 'IM1234';
        const userName = 'izuku.midoriya';
        const googleCalendarId = 'izuku.midoriya@example.com';
        userCreateInteractor.handle(userId, userName, googleCalendarId);
        expect(ContentService.createTextOutput).toHaveBeenCalledTimes(1);
      });
    });

    describe('when invalid', () => {
      describe('when found target user', () => {
        it('sends a create error message successfully', () => {
          jest
            .spyOn(UserRepository.prototype, 'findByUserId')
            .mockReturnValue(new User('IM1234', 'izuku.midoriya', new Date()));

          const userId = 'IM1234';
          const userName = 'izuku.midoriya';
          const googleCalendarId = 'izuku.midoriya@example.com';
          userCreateInteractor.handle(userId, userName, googleCalendarId);
          expect(ContentService.createTextOutput).toHaveBeenCalledTimes(1);
        });
      });

      describe('when found target user setting', () => {
        it('sends a create error message successfully', () => {
          jest.spyOn(UserRepository.prototype, 'findByUserId').mockReturnValue(null);
          jest
            .spyOn(UserSettingRepository.prototype, 'findByUserId')
            .mockReturnValue(new UserSetting('IM1234', 'izuku.midoriya@exmaple.com'));

          const userId = 'IM1234';
          const userName = 'izuku.midoriya';
          const googleCalendarId = 'izuku.midoriya@example.com';
          userCreateInteractor.handle(userId, userName, googleCalendarId);
          expect(ContentService.createTextOutput).toHaveBeenCalledTimes(1);
        });
      });

      describe('when googleCalendarId is null', () => {
        it('sends a create error message successfully', () => {
          jest.spyOn(UserRepository.prototype, 'findByUserId').mockReturnValue(null);
          jest.spyOn(UserSettingRepository.prototype, 'findByUserId').mockReturnValue(null);

          const userId = 'IM1234';
          const userName = 'izuku.midoriya';
          const googleCalendarId = null;
          userCreateInteractor.handle(userId, userName, googleCalendarId);
          expect(ContentService.createTextOutput).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
