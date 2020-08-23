export class UserSettingGoogleCalendarId {
  googleCalendarId: string;
  constructor(googleCalendarId: string) {
    if (!googleCalendarId) {
      throw new Error('UserSettingGoogleCalendarIdが存在しません');
    }
    if (typeof googleCalendarId !== 'string') {
      throw new Error(
        'UserSettingGoogleCalendarIdはstring型でなければなりません',
      );
    }
    this.googleCalendarId = googleCalendarId;
  }

  toString(): string {
    return this.googleCalendarId;
  }
}
