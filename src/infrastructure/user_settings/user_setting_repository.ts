import { UserSettingRepositoryInterface } from '../../domain/models/user_setting/user_setting_repository_interface';
import { UserSetting } from '../../domain/models/user_setting/user_setting';
import { BaseRepository } from '../base_repository';
import { GoogleAppsScriptConstants } from '../../constants';

export class UserSettingRepository extends BaseRepository
  implements UserSettingRepositoryInterface {
  constructor(sheetName = 'user_settings') {
    super(sheetName);
  }

  map(data: any[][]): readonly UserSetting[] {
    return data.map((e) => {
      return new UserSetting(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]);
    });
  }

  findByUserId(userId: string): UserSetting | null {
    const user = this.fullData.find((e) => e.isTargetUser(userId));
    return !!user ? user : null;
  }

  create(userId: string, googleCalendarId: string): UserSetting {
    const userSetting = new UserSetting(userId, googleCalendarId);

    const workStartHour = userSetting.getWorkStartHour().toNumber();
    const workStartMinute = userSetting.getWorkStartMinute().toNumber();
    const workEndHour = userSetting.getWorkEndHour().toNumber();
    const workEndMinute = userSetting.getWorkEndMinute().toNumber();
    const notificationStatus = userSetting.getNotificationStatus().toString();
    const updatedAt = userSetting.getUpdatedAt();

    this.sheet
      .getRange(this.lastRow + 1, 1, 1, this.lastCol)
      .setValues([
        [
          userId,
          googleCalendarId,
          workStartHour,
          workStartMinute,
          workEndHour,
          workEndMinute,
          notificationStatus,
          updatedAt,
        ],
      ]);

    this.putCache(
      userId,
      googleCalendarId,
      workStartHour,
      workStartMinute,
      workEndHour,
      workEndMinute,
      notificationStatus,
      updatedAt,
    );

    return userSetting;
  }

  putCache(
    userId: string,
    googleCalendarId: string,
    workStartHour: number,
    workStartMinute: number,
    workEndHour: number,
    workEndMinute: number,
    notificationStatus: string,
    updatedAt: Date,
  ): void {
    const userSettingsCache: readonly any[][] = !this.dbCache
      ? this.getRawData()
      : JSON.parse(this.dbCache);

    const userSettingsCacheClone = [...userSettingsCache];
    userSettingsCacheClone.push([
      userId,
      googleCalendarId,
      workStartHour,
      workStartMinute,
      workEndHour,
      workEndMinute,
      notificationStatus,
      updatedAt,
    ]);

    this.cache?.put(
      'data:user_settings',
      JSON.stringify(userSettingsCacheClone),
      GoogleAppsScriptConstants.MAX_CACHE_EXPIRATION_IN_SECONDS,
    );
  }
}
