import { UserSetting } from '../../../../../src/domain/models/user_setting/user_setting';

describe('UserSetting', () => {
  describe('.validate', () => {
    describe('when valid', () => {
      it('returns null', () => {
        const googleCalendarId = 'izuku.midoriya@example.com';
        const result = UserSetting.validate(googleCalendarId);
        expect(result).toBe(null);
      });
    });

    describe('when invalid', () => {
      it('returns error message', () => {
        const googleCalendarId = null;
        const result = UserSetting.validate(googleCalendarId);
        expect(result).toBe('UserSettingGoogleCalendarIdが存在しません');
      });
    });
  });
});
