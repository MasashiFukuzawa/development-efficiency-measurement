import { UserSettingRepository } from '../../../../src/infrastructure/user_settings/user_setting_repository';

describe('UserSettingRepository', () => {
  const constantParams = [10, 0, 19, 0, 'on', new Date()];

  SpreadsheetApp.openById = jest.fn(() => ({
    getSheetByName: jest.fn(() => ({
      getLastRow: jest.fn(() => 4),
      getLastColumn: jest.fn(() => 8),
      getRange: jest.fn(() => ({
        getValues: jest.fn(() => [
          ['IM1234', 'izuku.midoriya@example.com', ...constantParams],
          ['KB5678', 'katsuki.bakugo@example.com', ...constantParams],
          ['OU1234', 'ochako.uraraka@example.com', ...constantParams],
          ['ST5678', 'shoto.todoroki@example.com', ...constantParams],
        ]),
        setValues: jest.fn(),
      })),
    })),
  })) as any;

  PropertiesService.getScriptProperties = jest.fn(() => ({
    getProperty: jest.fn(() => 'SPREAD_SHEET_ID'),
  })) as any;

  const userSettingRepository = new UserSettingRepository();

  describe('#findByUserId', () => {
    describe('when valid', () => {
      it('returns a userSetting resource', () => {
        const userSetting = userSettingRepository.findByUserId('IM1234');
        const userId = userSetting.getUserId().toString();
        const googleCalendarId = userSetting.getGoogleCalendarId().toString();
        const workStartHour = userSetting.getWorkStartHour().toNumber();
        const workStartMinute = userSetting.getWorkStartMinute().toNumber();
        const workEndHour = userSetting.getWorkEndHour().toNumber();
        const workEndMinute = userSetting.getWorkEndMinute().toNumber();
        const notificationStatus = userSetting
          .getNotificationStatus()
          .toString();
        expect(userId).toBe('IM1234');
        expect(googleCalendarId).toBe('izuku.midoriya@example.com');
        expect(workStartHour).toBe(10);
        expect(workStartMinute).toBe(0);
        expect(workEndHour).toBe(19);
        expect(workEndMinute).toBe(0);
        expect(notificationStatus).toBe('on');
      });
    });

    describe('when invalid', () => {
      it('returns null', () => {
        const userSetting = userSettingRepository.findByUserId(
          'momo.yaoyorozu',
        );
        expect(userSetting).toBe(null);
      });
    });
  });

  describe('#create', () => {
    it('creates successfully', () => {
      const userSetting = userSettingRepository.create(
        'MY1234',
        'momo.yaoyorozu@example.com',
      );
      const userId = userSetting.getUserId().toString();
      const googleCalendarId = userSetting.getGoogleCalendarId().toString();
      const workStartHour = userSetting.getWorkStartHour().toNumber();
      const workStartMinute = userSetting.getWorkStartMinute().toNumber();
      const workEndHour = userSetting.getWorkEndHour().toNumber();
      const workEndMinute = userSetting.getWorkEndMinute().toNumber();
      const notificationStatus = userSetting.getNotificationStatus().toString();
      expect(userId).toBe('MY1234');
      expect(googleCalendarId).toBe('momo.yaoyorozu@example.com');
      expect(workStartHour).toBe(10);
      expect(workStartMinute).toBe(0);
      expect(workEndHour).toBe(19);
      expect(workEndMinute).toBe(0);
      expect(notificationStatus).toBe('on');
    });
  });
});
