import { UserId } from '../user/value_objects/user_id';
import { UserSettingGoogleCalendarId } from './value_objects/user_setting_google_calendar_id';
import { UserSettingNotificationStatus } from './value_objects/user_setting_notification_status';
import { UserSettingWorkEndHour } from './value_objects/user_setting_work_end_hour';
import { UserSettingWorkEndMinute } from './value_objects/user_setting_work_end_minute';
import { UserSettingWorkStartHour } from './value_objects/user_setting_work_start_hour';
import { UserSettingWorkStartMinute } from './value_objects/user_setting_work_start_minute';

export class UserSetting {
  private readonly userId: UserId;
  private readonly googleCalendarId: UserSettingGoogleCalendarId;
  private readonly workStartHour: UserSettingWorkStartHour;
  private readonly workStartMinute: UserSettingWorkStartMinute;
  private readonly workEndHour: UserSettingWorkEndHour;
  private readonly workEndMinute: UserSettingWorkEndMinute;
  private readonly notificationStatus: UserSettingNotificationStatus;
  private readonly updatedAt: Date;
  constructor(
    userId: string,
    googleCalendarId: string,
    workStartHour = 10,
    workStartMinute = 0,
    workEndHour = 19,
    workEndMinute = 0,
    notificationStatus = 'on',
    updatedAt = new Date(),
  ) {
    this.userId = new UserId(userId);
    this.googleCalendarId = new UserSettingGoogleCalendarId(googleCalendarId);
    this.workStartHour = new UserSettingWorkStartHour(workStartHour);
    this.workStartMinute = new UserSettingWorkStartMinute(workStartMinute);
    this.workEndHour = new UserSettingWorkEndHour(workEndHour);
    this.workEndMinute = new UserSettingWorkEndMinute(workEndMinute);
    this.notificationStatus = new UserSettingNotificationStatus(
      notificationStatus,
    );
    this.updatedAt = updatedAt;
  }

  getUserId(): UserId {
    return this.userId;
  }

  getGoogleCalendarId(): UserSettingGoogleCalendarId {
    return this.googleCalendarId;
  }

  getWorkStartHour(): UserSettingWorkStartHour {
    return this.workStartHour;
  }

  getWorkStartMinute(): UserSettingWorkStartMinute {
    return this.workStartMinute;
  }

  getWorkEndHour(): UserSettingWorkEndHour {
    return this.workEndHour;
  }

  getWorkEndMinute(): UserSettingWorkEndMinute {
    return this.workEndMinute;
  }

  getNotificationStatus(): UserSettingNotificationStatus {
    return this.notificationStatus;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  static validate(googleCalendarId: string): string | null {
    try {
      new UserSettingGoogleCalendarId(googleCalendarId);
      return null;
    } catch (e) {
      return e.message;
    }
  }
}
