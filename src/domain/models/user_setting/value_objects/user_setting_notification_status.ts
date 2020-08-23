export class UserSettingNotificationStatus {
  notificationStatus: 'on' | 'off';
  constructor(notificationStatus: string) {
    if (!notificationStatus) {
      throw new Error('UserSettingNotificationStatusが存在しません');
    }

    if (typeof notificationStatus !== 'string') {
      throw new Error(
        'UserSettingNotificationStatusはstring型でなければなりません',
      );
    }

    if (notificationStatus === 'on' || notificationStatus === 'off') {
      this.notificationStatus = notificationStatus;
    } else {
      throw new Error(
        'UserSettingNotificationStatusの取り得る値は `on` または `off` のいずれかです',
      );
    }
  }

  toString(): string {
    return this.notificationStatus;
  }
}
