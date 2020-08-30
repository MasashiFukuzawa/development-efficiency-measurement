import { UserSettingRepositoryInterface } from '../../domain/models/user_setting/user_setting_repository_interface';
import { UserSetting } from '../../domain/models/user_setting/user_setting';
import { BaseRepository } from '../base_repository';

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
    const user = this.fullData.filter((e) => {
      return e.getUserId().toString() === userId;
    })[0];
    return !!user ? user : null;
  }

  create(userId: string, googleCalendarId: string): UserSetting {
    const userSetting = new UserSetting(userId, googleCalendarId);
    this.sheet
      .getRange(this.lastRow + 1, 1, 1, this.lastCol)
      .setValues([
        [
          userId,
          googleCalendarId,
          userSetting.getWorkStartHour().toNumber(),
          userSetting.getWorkStartMinute().toNumber(),
          userSetting.getWorkEndHour().toNumber(),
          userSetting.getWorkEndMinute().toNumber(),
          userSetting.getNotificationStatus().toString(),
          userSetting.getUpdatedAt(),
        ],
      ]);
    return userSetting;
  }
}
