import { UserSetting } from './user_setting';

export interface UserSettingRepositoryInterface {
  findByUserId(userId: string): UserSetting | null;
  create(userId: string, googleCalendarId: string): UserSetting;
}
