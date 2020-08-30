import { GlobalConstants } from '../../../../constants';

export class UserSettingGoogleCalendarId {
  googleCalendarId: string;
  constructor(googleCalendarId: string) {
    if (!googleCalendarId) {
      throw new Error('UserSettingGoogleCalendarIdが存在しません');
    }

    if (typeof googleCalendarId !== 'string') {
      throw new Error('UserSettingGoogleCalendarIdはstring型でなければなりません');
    }

    if (!GlobalConstants.EMAIL_REGEXP.test(googleCalendarId)) {
      throw new Error(
        `GoogleCalendarIdは \`xxx@finc.com\` のような形式で入力して下さい。入力値: ${googleCalendarId}`,
      );
    }

    this.googleCalendarId = googleCalendarId;
  }

  toString(): string {
    return this.googleCalendarId;
  }
}
