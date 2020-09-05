import { UserSetting } from './user_setting';

export interface UserSettingRepositoryInterface {
  getAll(): readonly UserSetting[];
  getRawData(): readonly any[][];
  map(data: any[][]): readonly UserSetting[];
  putCache(
    userId: string,
    googleCalendarId: string,
    workStartHour: number,
    workStartMinute: number,
    workEndHour: number,
    workEndMinute: number,
    notificationStatus: string,
    updatedAt: Date,
  ): void;
  findByUserId(userId: string): UserSetting | null;
  create(userId: string, googleCalendarId: string): UserSetting;
}
